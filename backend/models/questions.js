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
    sessionID : { 
        type : Number,
        required: true
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Question', QuestionSchema);
