import React, { useState } from "react";
import "./App.css"; // CSS file

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleChange = (e) => setNewTask(e.target.value);

  const handleAdd = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleClearCompleted = () => {
    const filtered = tasks.filter((task) => !task.completed);
    setTasks(filtered);
  };

  const remaining = tasks.filter((task) => !task.completed).length;

  return (
    <div className="todo-container">
      <h2>📝</h2>
      <div className="input-row">
        <input
          type="text"
          value={newTask}
          onChange={handleChange}
          placeholder="Enter a task"
        />
        <button onClick={handleAdd}>Add Todo</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />
            <span className={task.completed ? "completed" : ""}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>

      <div className="buttons-row">
        <button onClick={handleClearCompleted}>Clear Complete</button>
        <span>{remaining} left to do</span>
      </div>
    </div>
  );
}

export default App;
