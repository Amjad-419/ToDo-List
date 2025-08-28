// Importiert benötigte Module
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Erlaubt Anfragen vom Frontend
app.use(express.json()); // JSON-Anfragen verarbeiten

// Speicher für Aufgaben (vorerst nur im Speicher, nicht in einer DB)
let tasks = [];

// GET: Alle Aufgaben zurückgeben
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST: Neue Aufgabe hinzufügen
app.post("/tasks", (req, res) => {
  const newTask = req.body.task;
  if (newTask) {
    tasks.push(newTask);
    res.status(201).json({ message: "Aufgabe hinzugefügt", tasks });
  } else {
    res.status(400).json({ message: "Ungültige Aufgabe" });
  }
});

// DELETE: Aufgabe löschen
app.delete("/tasks/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.json({ message: "Aufgabe gelöscht", tasks });
  } else {
    res.status(400).json({ message: "Ungültiger Index" });
  }
});

// Server starten
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
const path = require("path");

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, "../Frontend")));
