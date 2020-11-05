var express = require('express');
var app = express();

// app.get('/api', function(req, res) {
module.exports = function(router, db) {
    var r = router.route('/classes-s');

    var sql = require("mssql");
    // var route = router.route('/classes-s');

    // config for your database
    r.get(async function(req, res) {
        let sql_results = ""
        let results = db.query('SELECT * FROM `Classes`', function (err, result, fields) {
            if (err) throw err;
             console.log(result[0]);
        });
        console.log(results)

        // var request = new sql.Request();
        // let results = request.query('SELECT * FROM Classes', function(err, records, fields){
        //     if (err) console.log(err);
        //     res.send(record);
        // });

        // console.log(results);
        // var db = sql.connect(secrets.sql_connection, function(err){
        //     if (err) console.log(err);
        // });
    });

    return router;
}