var express = require("express");
var app = express();
const responseModel = require('../models/responses');

module.exports = function (router, db) {
    router.route("/attendance/:crn")
        .get(async function (req, res) {
            let sql_query = `SELECT netID FROM Enrollments WHERE crn = ${req.params.crn}`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                let temp = {};

                let fetch_session = `SELECT sessionID FROM Sessions WHERE crn = ${req.params.crn}`;
                db.query(fetch_session, (err, result2) => {
                    result.forEach(student => {
                        let sess_arr = []
                        result2.forEach(async session => {
                            // mongodb part
                            const response = await responseModel.exists({sessionID: session.sessionID, netID: student.netID});
                            if (response) {
                                sess_arr.push(1)
                            }
                            else {
                                sess_arr.push(0)
                            }

                        });
                        console.log(sess_arr);
                        temp[student.netID] = sess_arr;
                    });
                    res.json({data: temp});
                });
                
            });
        });
        
  return router;
};
