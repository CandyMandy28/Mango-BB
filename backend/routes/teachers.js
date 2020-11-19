var express = require("express");
var app = express();

module.exports = function (router, db) {
    router.route("/teachers")
        .get(async function (req, res) {
            let sql_query = 
                `SELECT * FROM Classes`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        });

    router.route("/teachers/:teacherID")
        // get classes the teacher is teaching
        .get(async function (req, res) {
            let sql_query = 
                `SELECT * FROM Classes 
                WHERE Classes.teacherID = '${req.params.teacherID}'`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })

        // adding a class the teacher will be teaching.
        .post(async function (req, res) {
            let sql_query = 
                `INSERT INTO Classes VALUES
                (${req.body.crn}, '${req.body.className}', ${req.body.teacherID})`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        });
    
    router.route("/teachers/:teacherID/:crn")
        // get the students in each class
        .get(async function (req, res) {
            let sql_query = 
                `SELECT * FROM Enrollments NATURAL JOIN Classes 
                WHERE Classes.teacherID = '${req.params.teacherID}' AND crn = ${req.params.crn}`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })

        // delete this class and remove all the students from it.
        .delete(async function (req, res) {
            let sql_query = 
                `DELETE FROM Enrollments NATURAL JOIN Classes 
                WHERE Classes.teacherID = '${req.params.teacherID}' 
                AND Enrollments.crn = ${req.params.crn} 
                AND Classes.crn = ${req.params.crn}`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })
        
  return router;
};
