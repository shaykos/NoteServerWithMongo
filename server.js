//Libraries
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

//Routes
const NotesRoutes = require('./controllers/noteController');

//Server initialize
const PORT = process.env.PORT || 5008;
const server = express();
server.use(cors()); //allow us to access the server from each endpoint
server.use(express.json()); //add json support for POST, GET, PUT, DELETE 
server.use(express.static(path.join(__dirname, 'build/')));

//Global Get Request
server.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'build/', 'index.html'));
});

//routes
server.use('/api/notes', NotesRoutes);



//Run the server
server.listen(PORT, ()=>console.log(`http://localhost:${PORT}`));

