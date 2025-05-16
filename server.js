const response = fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4&sort=name');
const express = require('express');
const app = express();
const port = 3000;

// Load trivia questions from the JSON file
const trivia = require('./Trivia.json');

// API endpoint to get trivia questions
app.get('/api/trivia', (req, res) => {
    res.json(trivia);
});

// Start the server
app.listen(port, () => {
    console.log(`Trivia API is running at http://localhost:${port}`);
});