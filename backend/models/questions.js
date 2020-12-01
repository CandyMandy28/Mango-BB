// Load required packages
var mongoose = require('mongoose');

// Define our task schema
var QuestionSchema = new mongoose.Schema({
    timeAsked: {
        type: Date,
        default: Date.now
    },
    question: {
        type: String,
        trim: true
    },
    correctAnswer: {
        type: String,
        trim: true
    },
    timer : { 
        type : Number,
        default: 60
    },
    sessionID : { 
        type : Number
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Question', QuestionSchema);
