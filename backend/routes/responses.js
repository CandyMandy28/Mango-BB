const responseModel = require('../models/responses');
const questionModel = require('../models/questions');

module.exports = function (router, db) {

    router.route('/responses')
        .get(async function (req, res) {
            let responses = await responseModel.find();
            try {
                res.send({message: "OK", data: responses});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        })

        .post(async function (req, res) {
            const response = new responseModel(req.body);
            try {
                await response.save();
                res.status(201).send({message: "OK", data: response});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        });

    router.route('/responses/:id')
        .get(async function (req, res) {
            try {
                const response = await responseModel.findById(req.params.id);
                res.send({message: "OK", data: response});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        })
    
        .put(async function (req, res) {
            try {
                const response = await responseModel.findByIdAndUpdate(req.params.id, req.body);
                await response.save();
                for (key in req.body) {
                    response[key] = req.body[key];
                }
                res.send({message: "OK", data: response});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        })
    
        .delete(async function (req, res) {
            try {
                const response = await responseModel.findByIdAndDelete(req.params.id)
                res.send({message: "OK", data: response});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        });

    router.route('/responses/avg/:id')
        .get(async function (req, res) {
            let total = -1;
            let score = -1;
            let solution = "";
            
            let correct = await questionModel.findById(req.params.id);
            if(correct.hasNext()) {
                solution = correct.next().correctAnswer;
            }

            let totalquery = await responseModel.aggregate(
                {$match: {questionID: req.params.id}},
                {$project: {_id: 0, questionID: 1, total: {$sum: 1}}}
            );
            if (totalquery.hasNext()) {
                total = totalquery.next().total;
            }

            let scorequery = await responseModel.aggregate(
                {$match: {questionID: req.params.id, answer: solution}},
                {$project: {_id: 0, questionID: 1, scores: {$sum: 1}}}
            );
            if (scorequery.hasNext()) {
                score = scorequery.next().scores;
            }
            
            let average = 0;
            if(score == -1 || total == 0 || score > total) {
                average = -1;
            } else {
                average = score / total;
            }

            let responses = await questionModel.aggregate(
                {$match: {questionID: req.params.id}},
                {$project: {_id: 0, averageScore: average}}
            )

            try {
                res.send({message: "OK", data: responses});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        });

    router.route('/responses/live/:id')
        .get(async function (req, res) {
            let responses = await responseModel.aggregate(
                {$match: {questionID: req.params.id}},
                {$group: {_id: "$answer", numAnswers: {$sum: 1}}},
                {$project: {_id: 0, questionID: 1, answer: 1, numAnswers: 1}}
            );
            try {
                res.send({message: "OK", data: responses});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        });

    return router;
}