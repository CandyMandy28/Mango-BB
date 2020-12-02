const questionModel = require('../models/questions');

module.exports = function (router, db) {

    router.route('/questions')
        .get(async function (req, res) {
            let questions = await questionModel.find();
            try {
                res.send({message: "OK", data: questions});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        })

        .post(async function (req, res) {
            const question = new questionModel(req.body);
            try {
                await question.save();
                res.status(201).send({message: "OK", data: question});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        });

    router.route('/questions/:id')
        .get(async function (req, res) {
            try {
                const question = await questionModel.findById(req.params.id);
                res.send({message: "OK", data: question});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        })
    
        .put(async function (req, res) {
            try {
                const question = await questionModel.findByIdAndUpdate(req.params.id, req.body);
                await question.save();
                for (key in req.body) {
                    question[key] = req.body[key];
                }
                res.send({message: "OK", data: question});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        })
    
        .delete(async function (req, res) {
            try {
                const question = await questionModel.findByIdAndDelete(req.params.id)
                res.send({message: "OK", data: question});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        });
    
    router.route('/questions/session/:id')
        .get(async function (req, res) {
            try {
                const question = await questionModel.find({sessionID: req.params.id}).sort( {timeAsked: -1});
                res.send({message: "OK", data: question});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        })

    return router;
}