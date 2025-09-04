import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!username) return;
    const socket = io("http://localhost:5000", { auth: { username } });
    socketRef.current = socket;

    socket.on("init", (data) => {
      setUsers(data.users || []);
      setMessages(data.messages || []);
    });
    socket.on("message", (msg) => setMessages((m) => [...m, msg]));
    socket.on("user:joined", (u) => setUsers((arr) => [...arr, u]));
    socket.on("user:left", (u) => setUsers((arr) => arr.filter((x) => x !== u)));
    socket.on("typing", (t) => setTyping(t));

    return () => socket.disconnect();
  }, [username]);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    window.location.reload();
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;
    socketRef.current.emit("message", text);
  };

  return (
    <div className="app">
      {!username ? (
        <form onSubmit={handleLogin}>
          <h2>Enter username</h2>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
          <button type="submit">Join</button>
        </form>
      ) : (
        <div className="chat">
          <aside>
            <h3>Users</h3>
            <ul>{users.map((u) => <li key={u}>{u}</li>)}</ul>
          </aside>
          <main>
            <div className="messages">
              {messages.map((m) => (
                <div key={m.id}>
                  <strong>{m.username}</strong>: {m.text}
                </div>
              ))}
            </div>
            {typing && <div>{typing.username} is typing...</div>}
            <MessageInput onSend={sendMessage} socket={socketRef.current} />
          </main>
        </div>
      )}
    </div>
  );
}

function MessageInput({ onSend, socket }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(text);
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (socket) socket.emit("typing", true);
    setTimeout(() => {
      if (socket) socket.emit("typing", false);
    }, 700);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={handleChange} placeholder="Type a message..." />
      <button type="submit">Send</button>
    </form>
  );
}

export default App;
