// src/components/NoteForm.jsx
import React, { useEffect, useState } from "react";

export default function NoteForm({ onSubmit, editingNote, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || "");
      setContent(editingNote.content || "");
      setPinned(Boolean(editingNote.pinned));
    } else {
      setTitle("");
      setContent("");
      setPinned(false);
    }
  }, [editingNote]);

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    onSubmit({ title: title.trim(), content, pinned });
  }

  return (
    <form className="card form" onSubmit={submit}>
      <div className="row">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="pin">
          <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} />
          Pin
        </label>
      </div>
      <textarea placeholder="Content (optional)" rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
      <div className="actions">
        <button className="primary" type="submit">{editingNote ? "Update" : "Add"} Note</button>
        {editingNote && <button type="button" className="secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
