// src/App.jsx
import React, { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteItem from "./components/NoteItem";
import { listNotes, createNote, updateNote, deleteNote } from "./api";
import "./styles/app.css";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function refresh(search = "") {
    try {
      setLoading(true);
      const data = await listNotes(search);
      setNotes(data);
    } catch (e) {
      setErr(e.message || "Failed to load notes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleSubmit(payload) {
    try {
      setErr("");
      if (editing) {
        await updateNote(editing._id, payload);
        setEditing(null);
      } else {
        await createNote(payload);
      }
      await refresh(q);
    } catch (e) {
      setErr(e.message || "Save failed");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this note?")) return;
    try {
      await deleteNote(id);
      await refresh(q);
    } catch (e) {
      setErr(e.message || "Delete failed");
    }
  }

  async function togglePin(note) {
    try {
      await updateNote(note._id, { pinned: !note.pinned });
      await refresh(q);
    } catch (e) {
      setErr(e.message || "Failed to pin");
    }
  }

  function handleSearchChange(e) {
    const v = e.target.value;
    setQ(v);
    // debounce is optional; simple call is okay:
    refresh(v);
  }

  return (
    <div className="container">
      <h1>📝 Notes App (Day 13)</h1>

      {err && <div className="error">{err}</div>}

      <div className="toolbar">
        <input
          placeholder="Search notes..."
          value={q}
          onChange={handleSearchChange}
        />
      </div>

      <NoteForm onSubmit={handleSubmit} editingNote={editing} onCancel={() => setEditing(null)} />

      <div className="notes-list">
        {loading ? (
          <div className="card">Loading...</div>
        ) : notes.length === 0 ? (
          <div className="card">No notes yet — add one above.</div>
        ) : (
          notes.map((n) => (
            <NoteItem
              key={n._id}
              note={n}
              onEdit={() => setEditing(n)}
              onDelete={() => handleDelete(n._id)}
              onTogglePin={() => togglePin(n)}
            />
          ))
        )}
      </div>
    </div>
  );
}
