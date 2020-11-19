module.exports = function (router, db) {

    router.route("/users")
        .get(async function (req, res) {
            try {
                res.send({message: "OK", data: ""});
            } catch (err) {
                res.status(500).send({message: "Error", data: err})
            }
        })

        .post(async function (req, res) {
            let sql_query = `INSERT INTO Users VALUES
                (null, '${req.body.netid}', '${req.body.email}', '${req.body.password}', ${req.body.acc_type})`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
            });
            
            // Students
            if (req.body.acc_type == 1) {
                sql_query = `INSERT INTO Students VALUES
                ('${req.body.netid}', "${req.body.name}", '${req.body.email}')`;
            }
            // Teachers
            else {
                sql_query = `INSERT INTO Teachers VALUES
                ('${req.body.netid}', "${req.body.name}", '${req.body.email}')`;
            }

            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        });
    
    router.route("/users/:email")
        .get(async function (req, res) {
            let sql_query = `SELECT * FROM Users WHERE email = '${req.params.email}'`;
            db.query(sql_query, (err, result) => {
                if (err) throw err;
                res.json({ data: result });
            });
        })

    return router;
}