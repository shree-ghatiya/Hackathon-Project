// backend/server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors()); // for dev you can allow all origins; tighten in production
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' } // allow frontend at localhost:5173
});

// simple route so visiting http://localhost:5000 doesn't show "Cannot GET /"
app.get('/', (req, res) => {
  res.send('✅ Socket.IO chat backend is running. Frontend connects via Socket.IO.');
});

// If you build the React app (frontend/dist), serve it automatically
const frontendDist = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// In-memory data for quick prototype
const messages = [];       // keep last messages in memory
const users = new Map();   // socket.id -> username

io.on('connection', (socket) => {
  const { username } = socket.handshake.auth || {};
  if (!username) {
    socket.emit('error', 'username required');
    socket.disconnect();
    return;
  }

  users.set(socket.id, username);
  console.log(`${username} connected (${socket.id})`);

  // send initial state to this socket
  socket.emit('init', { users: Array.from(users.values()), messages });

  // notify others
  socket.broadcast.emit('user:joined', username);

  // receive message event
  socket.on('message', (text) => {
    const msg = {
      id: Date.now().toString(),
      username: users.get(socket.id),
      text,
      createdAt: new Date().toISOString()
    };
    messages.push(msg);
    io.emit('message', msg); // broadcast to all
  });

  // typing indicator
  socket.on('typing', (isTyping) => {
    socket.broadcast.emit('typing', { username: users.get(socket.id), isTyping });
  });

  socket.on('disconnect', () => {
    const name = users.get(socket.id);
    users.delete(socket.id);
    socket.broadcast.emit('user:left', name);
    console.log(`${name} disconnected`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
