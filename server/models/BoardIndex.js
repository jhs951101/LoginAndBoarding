const mongoose = require('mongoose');

const boardIndexSchema = mongoose.Schema({
    id: {
        type: Number,
        default: 0
    }
});

const BoardIndex = mongoose.model('BoardIndex', boardIndexSchema);
module.exports = {BoardIndex};