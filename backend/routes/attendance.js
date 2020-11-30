var express = require("express");
var app = express();
const responseModel = require('../models/responses');

module.exports = function (router, db) {
    router.route("/attendance/:crn")
        .get(async function (req, res) {
            let sql_query = `SELECT netID FROM Enrollments WHERE crn = ${req.params.crn}`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                let students = [];
                result.forEach(student => {
                    students.push(student.netID);
                })
                let fetch_session = `SELECT sessionID, startTime FROM Sessions WHERE crn = ${req.params.crn}`;
                db.query(fetch_session, async (err, result2) => {
                    let sessions = [];
                    let sessionTime = [];
                    result2.forEach(sess => {
                        sessions.push(sess.sessionID);
                        sessionTime.push(sess.startTime);
                    })
                    let ret_val = {};
                    for (let netID in students) {
                        let temp = [];
                        for (let session in sessions) {
                            const response = await responseModel.exists({sessionID: sessions[session], netID: students[netID]});
                            if (response) {
                                temp.push(1)
                            }
                            else {
                                temp.push(0)
                            }
                        }
                        ret_val[students[netID]] = temp;
                    }
                    res.json({"data": ret_val, "session": sessionTime});
                });
            });
        });

    router.route("/attendance/:crn/:netid")
        .get(async function (req, res) {
            let sql_query = `SELECT netID FROM Enrollments WHERE crn = ${req.params.crn}`;
            let fetch_session = `SELECT sessionID, startTime FROM Sessions WHERE crn = ${req.params.crn}`;
            db.query(fetch_session, async (err, result2) => {
                let sessions = [];
                let sessionTime = [];
                result2.forEach(sess => {
                    sessions.push(sess.sessionID);
                    sessionTime.push(sess.startTime);
                })
                let ret_val = {};
                let temp = [];
                let total_present = 0;
                for (let session in sessions) {
                    const response = await responseModel.exists({sessionID: sessions[session], netID: req.params.netid});
                    if (response) {
                        total_present += 1;
                        temp.push({session: sessionTime[session], attendance: 1})
                    }
                    else {
                        temp.push({session: sessionTime[session], attendance: 0})
                    }
                }
                
                res.json({"data": temp, "attn_percent": Math.round(total_present / sessions.length * 100)});
            });
        });
        
  return router;
};
