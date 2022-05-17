require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 5008;

//create the server instance
let server = express();
server.use(cors());
server.use(express.json());
server.use(express.static(path.join(__dirname, '/build')));

//connect to db
const client = new MongoClient(process.env.DB_URL);

server.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '/build', 'index.html'));
})



server.post('/insert', async (req, res) => {
    try {
        await client.connect();
        console.log('connected to DB');
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection('notes');
        await collection.insertOne({title:"test", description:"test"});
        let all = await collection.find();
        res.status(201).json(all)
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ error });
    }finally{
        client.close();
    }
});


//listen on port 5000
server.listen(PORT, () => console.log(`listening on: http://localhost:${PORT}`));
