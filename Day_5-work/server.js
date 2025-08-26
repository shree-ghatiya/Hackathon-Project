const express = require("express");
const app = express();
const port = 3000;
const students = [
  { id: 1, name: "Aman", age: 20, grade: "A" },
  { id: 2, name: "Priya", age: 19, grade: "B" },
  { id: 3, name: "Rahul", age: 21, grade: "A+" },
  { id: 4, name: "Simran", age: 18, grade: "C" }
];
app.get("/students", (req, res) => {
  res.json(students);
});
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
