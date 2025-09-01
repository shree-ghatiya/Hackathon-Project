// src/components/NoteItem.jsx
import React from "react";

export default function NoteItem({ note, onEdit, onDelete, onTogglePin }) {
  return (
    <div className={`note ${note.pinned ? "pinned" : ""}`}>
      <div className="note-head">
        <h3>{note.title}</h3>
        <div className="note-actions">
          <button onClick={onTogglePin}>{note.pinned ? "Unpin" : "Pin"}</button>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
      <p>{note.content}</p>
      <small>Updated: {new Date(note.updatedAt || note.createdAt).toLocaleString()}</small>
    </div>
  );
}
