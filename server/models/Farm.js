const mongoose = require('mongoose');
const { String } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    }
});

const Farm = mongoose.model('Farm', schema);

module.exports = Farm;