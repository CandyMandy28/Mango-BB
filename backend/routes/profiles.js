var express = require("express");
var app = express();

module.exports = function (router, db) {
    router.route("/profiles/:netID/:acc_type")
        .get(async function (req, res) {
            let sql_query = ''
            if (req.params.acc_type == 1) {
                sql_query = `SELECT * FROM Students WHERE netID = '${req.params.netID}'`;
            }
            else {
                sql_query = `SELECT * FROM Teachers WHERE teacherID = '${req.params.netID}'`;
            }
            
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })

        .put(async function (req, res) {
            let sql_query = ""
            if (req.params.acc_type == 1) {
                sql_query = `UPDATE Students SET studentName = '${req.body.name}' WHERE netID = '${req.params.netID}'`;
            }
            else {
                sql_query = `UPDATE Teachers SET teacherName = '${req.body.name}' WHERE teacherID = '${req.params.netID}'`;
            }
            
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })
        
  return router;
};
