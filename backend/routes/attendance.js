var express = require("express");
var app = express();
const responseModel = require('../models/responses');

module.exports = function (router, db) {
    router.route("/attendance/:crn")
        .get(async function (req, res) {
            let sql_query = `SELECT netID FROM Enrollments WHERE crn = ${req.params.crn}`;
            ldb.query(sql_query, (err, result) => {
                if (err) throw err;
                let temp = {};
                // let fetch_session = `SELECT sessionID FROM Sessions WHERE crn = ${req.params.crn}`;
                // db.query(fetch_session, (err, result2) => {
                //     console.log(result);
                //     Object.keys(result).forEach(function(netID) {
                //         let sess_arr = []
                //         Object.keys(result2).forEach(async function(session) {
                //             const response = await responseModel.exists({sessionID: result2[session].sessionID, netID: result[netID].netID});
                //             if (response) {
                //                 sess_arr.push(1)
                //             }
                //             else {
                //                 sess_arr.push(0)
                //             }
                //             console.log(sess_arr);
                //         });
                //         res.json({data: temp});
                //     });
                // });
            });
        });
        
  return router;
};
