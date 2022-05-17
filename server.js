require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5008;

//temp require
const Note = require('./Models/NoteModel');

//create the server instance
let server = express();
server.use(express.json());

//connect to db
mongoose.connect(process.env.DB_URL, () => { console.log('connected to mongodb atlas server') });

server.get('/', async (req, res) => {
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
