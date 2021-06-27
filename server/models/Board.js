const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    title: {
        type: String
    },
    contents: {
        type: String
    },
    email: {
        type: String
    },
    id: {
        type: Number
    },
});

const Board = mongoose.model('Board', boardSchema);
module.exports = {Board};