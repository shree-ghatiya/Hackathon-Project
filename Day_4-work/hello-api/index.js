const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Default route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
