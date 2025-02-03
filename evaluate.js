// server.js (Node.js Backend)
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// API endpoint to get quiz questions
app.get("/api/questions", (req, res) => {
    fs.readFile(path.join(__dirname, "data", "questions.json"), "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to load questions" });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
