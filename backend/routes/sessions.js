var express = require("express");
var app = express();

module.exports = function (router, db) {
    router.route("/sessions")
        .get(async function (req, res) {
            let sql_query = 
                `SELECT * FROM Sessions`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })

        // insert a new session
        .post(async function (req, res) {

            let sql_query = 
                `INSERT INTO Sessions (crn) VALUES
                (${req.body.crn})`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        });

    router.route("/sessions/:sessionID")
        // get sessions of this ID
        .get(async function (req, res) {
            let sql_query = 
                `SELECT * FROM Sessions 
                WHERE Sessions.sessionID = '${req.params.sessionID}'`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })
        
        .put(async function (req, res){
            let sql_query = `UPDATE Sessions SET endTime = CURRENT_TIMESTAMP(), avgScore = 0 WHERE sessionID = '${req.params.sessionID}'`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        });
    
    router.route("/sessions/class/:crn")
        // get the students in each class
        .get(async function (req, res) {
            let sql_query = 
                `SELECT * FROM Sessions
                WHERE Sessions.crn = '${req.params.crn}'`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        });
    
    router.route("/sessions/class/live/:crn")
        // get the students in each class
        .get(async function (req, res) {
            let sql_query = 
                `SELECT MAX(sessionID) FROM Sessions
                WHERE Sessions.crn = '${req.params.crn}'`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        });
        
  return router;
};
