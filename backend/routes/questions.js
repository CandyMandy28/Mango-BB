const questionModel = require('../models/questions');

module.exports = function (router, db) {

    var questionsRoute = router.route('/questions');

    questionsRoute.get(async function (req, res) {

        // let sql_results = ""
        // let results = db.query("SELECT * FROM Classes", function (err, result, fields) {
        //     if (err) throw err;
        //      console.log(result[0]);
        // });
        // console.log(results)
        
        let questions = await questionModel.find();
        try {
            res.send({message: "OK", data: questions});
        } catch (err) {
            res.status(500).send({message: "Error", data: err})
        }
    });
    questionsRoute.post(async function (req, res) {
        const question = new questionModel(req.body);
        try {
            await question.save();

            res.status(201).send({message: "OK", data: question});
        } catch (err) {
            res.status(500).send({message: "Error", data: err})
        }
    });

    return router;
}