const mongoose = require('mongoose');

const Note = mongoose.Schema({
    title:{
        require:true,
        type: String,
    },
    description:{
        type: String
    }
});

module.exports = mongoose.model('note', Note);