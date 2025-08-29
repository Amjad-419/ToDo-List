// Importiert benötigte Module
const express = require("express");
const cors = require("cors");
const { Pool } = require('pg');
const path = require("path");

const app = express();
app.use(cors()); // Erlaubt Anfragen vom Frontend
app.use(express.json()); // JSON-Anfragen verarbeiten




const pool = new Pool({
  host: "dpg-d2p2qo0dl3ps73eqp370-a",
  user: "todo_db_0caf_user",
  password: "PGOQfj22mw7JizmFBddxPPl3IGLiBZZj",
  database: "todo_db_0caf",
  port: 5432,
});


pool.connect(err => {
  if(err) {
    console.error("Fehler bei der Verbindung:", err);
    return;
  }
  console.log("Mit PostgreSQL-Datenbank verbunden ");
});

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, "../frontend")));


// --- GET: Alle Aufgaben zurückgeben ---
app.get("/tasks", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(results.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- POST: Neue Aufgabe hinzufügen ---
app.post("/tasks", async (req, res) => {
  const newTask = req.body.task;
  if (!newTask) return res.status(400).json({ message: "Ungültige Aufgabe" });

  try {
    await pool.query("INSERT INTO tasks (task_text) VALUES ($1)", [newTask]);
    res.status(201).json({ message: "Aufgabe hinzugefügt" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- DELETE: Aufgabe löschen ---
app.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.json({ message: "Aufgabe gelöscht" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});