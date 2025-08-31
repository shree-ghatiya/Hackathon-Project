import { useEffect, useState } from "react";
import { listNotes, createNote } from "./api";

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    listNotes().then(setNotes);
  }, []);

  const handleAdd = async () => {
    const newNote = await createNote({ text });
    setNotes([...notes, newNote]);
    setText("");
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {notes.map((n) => (
          <li key={n._id}>{n.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotesApp;
