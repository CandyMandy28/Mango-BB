// Get the packages we need
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    secrets = require('./config/secrets'),
    mysql = require("mysql"),
    bodyParser = require('body-parser');

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

// Connect to a MongoDB
mongoose.connect(secrets.mongo_connection,  { useNewUrlParser: true });

// Connec to SQL
var db = mysql.createConnection(secrets.sql_connection);

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// Create trigger for Users table

// let sql_query = `
// create trigger user_assign 
// before INSERT 
// on 
// Users 
// for each row
// begin 
//     if new.acc_type = 1
//     then
//         INSERT INTO Students(netID, studentName, email)
//         VALUES(new.id,CONCAT('Hi ', NEW.name, ', please update your date of birth.'));
//     else
        
//     end if;
// end;
// `;
// db.query(sql_query, (err, result) => {
//     if (err) throw err;
//     console.log("trigger created")
// });

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use routes as a module (see index.js)
require('./routes')(app, router, db);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
