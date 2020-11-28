const responseModel = require('../models/responses');

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

    return router;
}