// Importiert benötigte Module
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");

const app = express();
app.use(cors()); // Erlaubt Anfragen vom Frontend
app.use(express.json()); // JSON-Anfragen verarbeiten


const db = mysql.createConnection({
  host: "localhost",     // Standard: Lokaler Server
  user: "root",          // Standard-Benutzer
  password: "",          // Passwort (leer, falls nicht gesetzt)
  database: "shopdb"     // Name der Datenbank
});


// Verbindung testen
db.connect(err => {
  if (err) {
    console.error("Fehler bei der Verbindung:", err);
    return;
  }
  console.log("Mit MySQL-Datenbank verbunden");
});

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, "../frontend")));


// GET: Alle Aufgaben zurückgeben
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if(err) return res.status(500).json(err);
    res.json(results); // Ergebnisse mit id und task_text senden
  });
});


// POST: Neue Aufgabe hinzufügen
app.post("/tasks", (req, res) => {
  const newTask = req.body.task;
  if(!newTask) return res.status(400).json({ message: "Ungültige Aufgabe" });

  db.query("INSERT INTO tasks (task_text) VALUES (?)", [newTask], (err, result) => {
    if(err) return res.status(500).json(err);
    res.status(201).json({ message: "Aufgabe hinzugefügt" });
  });
});


// DELETE: Aufgabe löschen
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM tasks WHERE id = ?", [id], (err, result) => {
    if(err) return res.status(500).json(err);
    res.json({ message: "Aufgabe gelöscht" });
  });
});

// Server starten
const PORT =process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});