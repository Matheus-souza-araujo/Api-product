const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Category = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    
});

mongoose.model('category', Category);