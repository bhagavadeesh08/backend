const mongoose = require('mongoose');

const task1Schema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    rollno: {
        type: Number, 
        required: true
    },
    department: {
        type: String, 
        required: true
    },
    year: {
        type: Number, 
        required: true
    },
});

module.exports = mongoose.model('Task1', task1Schema);