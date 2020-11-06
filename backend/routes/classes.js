var express = require("express");
var app = express();

module.exports = function (router, db) {

    router.route("/classes")
        .get(async function (req, res) {
            let sql_query = "SELECT * FROM Classes";
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })

        .post(async function (req, res) {
            let sql_query = `INSERT INTO Classes VALUES(${req.body.crn}, '${req.body.className}', '${req.body.teacherID}')`;
            db.query(sql_query, 
            (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        });
    

    router.route("/classes/:crn")
        .get(async function (req, res) {
            let sql_query = `SELECT * FROM Classes WHERE crn = ${req.params.crn}`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })
    
        .put(async function (req, res) {
            var params = {
              ":crn": req.params.crn,
              ":className": req.body.className,
              ":teacherID": req.body.teacherID
            };

            var insertString = [];
            for (var p in params) {
                if (p === ":crn") {
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

            let sql_query = `UPDATE Classes SET ${insertString.join(", ")} WHERE crn = ${req.params.crn}`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })

        .delete(async function (req, res) {
            let sql_query = `DELETE FROM Classes WHERE crn = ${req.params.crn}`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })
        
  return router;
};
