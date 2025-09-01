// src/api.js
import axios from "axios";

// ✅ If backend has route like http://localhost:5000/api/notes
// use this:
const BASE_URL = "http://localhost:5000/api";

// If your backend is just http://localhost:5000/notes
// then change BASE_URL to "http://localhost:5000"

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// -------------------- Notes API --------------------

// List notes (with optional search query ?q=...)
export async function listNotes(query = "") {
  const url = query ? `/notes?q=${encodeURIComponent(query)}` : "/notes";
  const res = await api.get(url);
  return res.data;
}

// Create a new note
export async function createNote(noteData) {
  const res = await api.post("/notes", noteData);
  return res.data;
}

// Update an existing note
export async function updateNote(id, noteData) {
  const res = await api.put(`/notes/${id}`, noteData);
  return res.data;
}

// Delete a note
export async function deleteNote(id) {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
}
