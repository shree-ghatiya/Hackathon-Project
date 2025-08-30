import React, { useState, useEffect } from "react";

function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = () => {
    if (!name || !age) return;
    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age: parseInt(age) }),
    })
      .then((res) => res.json())
      .then((newStudent) => {
        setStudents([...students, newStudent]);
        setName("");
        setAge("");
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/students/${id}`, { method: "DELETE" })
      .then(() => setStudents(students.filter((s) => s.id !== id)));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎓 Student Directory</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={handleAdd}>Add Student</button>

      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} - {s.age} years
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDirectory;
