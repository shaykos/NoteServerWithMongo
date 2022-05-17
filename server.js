require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 5008;

//temp require
const Note = require('./Models/NoteModel');

//create the server instance
let server = express();
server.use(cors());
server.use(express.json());
server.use(express.static(path.join(__dirname, '/build')));

//connect to db
mongoose.connect(process.env.DB_URL, () => { console.log('connected to mongodb atlas server') });

server.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname,'/build','index.html'));
})

server.post('/insert', async (req, res) => {
    try {
        //let note = new Note({title:"title"});
        //let savedNote = await Note.save(note);
        let newNote = await Note.create({title:"title"});
        let notes = Note.find();
        res.status(201).json(notes);
    } catch (error) {
        console.log('error', error)
        res.status(500).json({error});
    }
});


//listen on port 5000
server.listen(PORT, () => console.log(`listening on: http://localhost:${PORT}`));
