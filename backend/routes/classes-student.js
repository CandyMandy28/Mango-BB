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
            res.send(result);
        });
        console.log(results);
    });

    return router;
}