const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, task: "Learn React" },
  { id: 2, task: "Build a To-Do App" }
];

// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// ADD a todo
app.post("/todos", (req, res) => {
  const { task } = req.body;
  const newTodo = { id: Date.now(), task };
  todos.push(newTodo);
  res.json(newTodo);
});

// DELETE a todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id != id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
