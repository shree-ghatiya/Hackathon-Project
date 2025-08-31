import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import notesRouter from "./routes/notes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/notes", notesRouter);

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/notesdb", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
  })
  .catch((err) => console.error("MongoDB error:", err));
