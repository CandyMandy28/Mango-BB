var express = require("express");
var app = express();

module.exports = function (router, db) {

    router.route("/enrollments")
        .get(async function (req, res) {
            let sql_query = "SELECT * FROM Enrollments";
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })

        .post(async function (req, res) {
            let sql_query = `INSERT INTO Enrollments VALUES
                (${req.body.crn}, '${req.body.netID}', ${req.body.score}, ${req.body.attendancePresent}, ${req.body.attendanceTotal})`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        });
    

    router.route("/enrollments/:netID")
        .get(async function (req, res) {
            let sql_query = `SELECT * FROM Enrollments NATURAL JOIN Classes WHERE netID = '${req.params.netID}'`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        });
    
    router.route("/enrollments/:netID/:crn")
        .get(async function (req, res) {
            let sql_query = `SELECT * FROM Enrollments NATURAL JOIN Classes WHERE netID = '${req.params.netID}' and crn = ${req.params.crn}`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })

        .put(async function (req, res) {
            var params = {
              ":crn": req.params.crn,
              ":netID": req.params.crn,
              ":score": req.body.score,
              ":attendancePresent": req.body.attendancePresent,
              ":attendanceTotal": req.body.attendanceTotal
            };

            var insertString = [];
            for (var p in params) {
                if (p === ":crn" || p === ":netID") {
                    continue;
                }
                else if (typeof params[p] !== "undefined") {
                    if (typeof params[p] == "string") {
                        insertString.push(`${p.slice(1)} = '${params[p]}'`);
                    }
                    else {
                        insertString.push(`${p.slice(1)} = ${params[p]}`);
                    }
                }
                else{
                    delete params[p];
                }
            }

            let sql_query = `UPDATE Enrollments SET ${insertString.join(", ")} WHERE netID = '${req.params.netID}' and crn = ${req.params.crn}`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })

        .delete(async function (req, res) {
            let sql_query = `DELETE FROM Enrollments WHERE netID = '${req.params.netID}' and crn = ${req.params.crn}`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        });
    
    router.route("/enrollments/teacher/courses/:crn")
        .get(async function (req, res) {
            let sql_query = `SELECT * FROM Enrollments WHERE crn = ${req.params.crn}`;
            console.log(sql_query);
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })
        
  return router;
};
