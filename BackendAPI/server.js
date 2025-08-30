const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: "Sahil", age: 20 },
  { id: 2, name: "Rahul", age: 21 },
];

// GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// POST new student
app.post("/students", (req, res) => {
  const { name, age } = req.body;
  const newStudent = { id: Date.now(), name, age };
  students.push(newStudent);
  res.json(newStudent);
});

app.get("/", (req, res) => {
  res.send("Student API is running ✅");
});


// DELETE student
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter((s) => s.id !== id);
  res.json({ message: "Student removed" });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
