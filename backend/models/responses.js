// Load required packages
var mongoose = require('mongoose');

// Define our task schema
var ResponseSchema = new mongoose.Schema({
    timeAnswered: {
        type: Date,
        default: Date.now
    },
    questionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    answer: {
        type: String,
        trim: true
    },
    netID : { 
        type: String,
        trim: true
    },
    sessionID : {
        type : Number
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Response', ResponseSchema);
