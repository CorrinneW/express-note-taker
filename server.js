// Dependencies

const fs = require('fs')
const db = require('db/db.json')
const express = require('express');
const path = require('path');
const generateUniqueId = require('generate-unique-id');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3001;

//Routes

//routes user to home page and notes page
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

//gets existing notes
app.get('/api/notes', (req, res) => res.json(db))

//saves new note
app.post('/api/notes'), (req, res) => {
    //newNote is set to the user-typed note
    const newNote = req.body;

    //sets note name to a unique ID
    newNote.routeName = generateUniqueId({
        length: 8,
        useLetters: false
       });
}

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));