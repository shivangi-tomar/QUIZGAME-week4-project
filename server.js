const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;


app.use(express.json());


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

// API endpoint to evaluate the answer
app.post("/api/submit", (req, res) => {
    const { question, answer } = req.body;

    fs.readFile(path.join(__dirname, "data", "questions.json"), "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to load questions" });
        }
        const questions = JSON.parse(data);
        const correctQuestion = questions.find(q => q.question === question);

        if (!correctQuestion) {
            return res.status(400).json({ error: "Invalid question" });
        }

        const isCorrect = correctQuestion.answer.toLowerCase() === answer.toLowerCase();
        res.json({ correct: isCorrect });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
