// Dependencies

const fs = require('fs');
const db = './db/db.json';
const express = require('express');
const path = require('path');

//npm package to generate a randomized id: https://www.npmjs.com/package/generate-unique-id
const generateUniqueId = require('generate-unique-id');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3001;

let notes = [];

app.use(express.static("public"));
//Routes

//routes user to home page and notes page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

//gets existing notes
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, "./db/db.json")));

//saves new note
app.post('/api/notes', (req, res) => {
    //gives each note the user creates a unique 8 number ID
    const newId = generateUniqueId({
        length: 8,
        useLetters: false
    });
    //newNote is set to the user-typed note
    console.log(req.body);

    fs.readFile(db, 'utf-8', function(err, data) {
        if(err) throw err;
        notes = JSON.parse(data);
        notes.push(req.body);

        fs.writeFile(db, JSON.stringify(notes), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!');
        })
    }) 

})

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));