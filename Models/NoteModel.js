const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: {
        require: true,
        type: String,
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('note', NoteSchema);;