const responseModel = require('../models/responses');
const questionModel = require('../models/questions');
var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = function (router, db) {

    router.route('/responses')
        .get(async function (req, res) {
            let responses = await responseModel.find();
            
            // for (let response in responses) {
            //     let t = 0;
            //     let correct = "";
            //     let time = await questionModel.findById(responses[response].questionID);
            //     if(time) {
            //         t = time.timeAsked;
            //         correct = time.correctAnswer;
            //     }

            //     let score = 0;
            //     let seconds = (responses[response].timeAnswered - t)/ 1000;
            //     let limit = 60;
            //     if (correct == responses[response].answer) {
            //         score = 700;
            //         if (seconds < limit) {
            //             score += parseInt((limit - seconds) / 5) * 25;
            //         }
            //     }

            //     responses[response]['score'] = score;

            //     const r = await responseModel.findByIdAndUpdate(responses[response].id, responses[response]);
            //     await r.save();
            // }

            try {
                res.send({message: "OK", data: responses});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        })

        .post(async function (req, res) {

            // Get score
            let t = 0;
            let correct = "";
            let time = await questionModel.findById(req.body.questionID);
            if(time) {
                t = time.timeAsked;
                correct = time.correctAnswer;
            }

            let score = 0;
            let seconds = (Date.now() - t)/ 1000;
            let limit = 60;
            if (correct == req.body.answer) {
                score = 700;
                if (seconds < limit) {
                    score += parseInt((limit - seconds) / 5) * 25;
                }
            }

            req.body['score'] = score;
            console.log(req.body);

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

            try {
                let total = -1;
                let score = -1;
                let solution = "";
                
                let correct = await questionModel.findById(req.params.id);
                if(correct) {
                    solution = correct.correctAnswer;
                }
                
                let totalquery = await responseModel.find({
                    questionID: ObjectId(req.params.id)
                });

                if (totalquery) {
                    total = totalquery.length;
                }

                let scorequery = await responseModel.find({
                    questionID: ObjectId(req.params.id),
                    answer: solution
                });
                if (scorequery) {
                    score = scorequery.length;
                }
                
                let average = 0;
                if(score == -1 || total == 0 || score > total) {
                    average = -1;
                } else {
                    average = score / total;
                }

                res.send({message: "OK", data: {"average": average}});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        });

    router.route('/responses/live/:id')
        .get(async function (req, res) {
            let responses = await responseModel.aggregate([
                {$match: {questionID: ObjectId(req.params.id)}},
                {$group: {_id: '$answer', numAnswers: {$sum: 1}}},
                {$project: {_id: 0, answer: '$_id', numAnswers: 1}},
                {$sort: { "answer" : 1}}
            ]);
            try {
                res.send({message: "OK", data: responses});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        });

    router.route('/responses/scores/:sessionid')
        .get(async function (req, res) {
            try {
                let response = await responseModel.aggregate([
                    {$match: {sessionID: parseInt(req.params.sessionid)}},
                    {$group: {_id: '$netID', totalscore: {$sum: "$score"}}},
                    {$project: {_id: 0, netID: '$_id', totalscore: 1}},
                    {$sort: { totalscore : -1}}
                ]);

                res.send({message: "OK", data: response});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        });

    router.route('/responses/scores/:sessionid/:netid')
        .get(async function (req, res) {
            try {
                let response = await responseModel.aggregate([
                    {$match: {sessionID: parseInt(req.params.sessionid), netID: req.params.netid}},
                    {$group: {_id: '$netID', totalscore: {$sum: "$score"}}},
                    {$project: {_id: 0, netID: '$_id', totalscore: 1}},
                    {$sort: { totalscore : -1}}
                ]);

                res.send({message: "OK", data: response});
            } catch (err) {
                res.status(404).send({message: "Error", data: err})
            }
        });
    
    
    return router;
}