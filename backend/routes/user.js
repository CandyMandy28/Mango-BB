const userModel = require('../models/user');

module.exports = function (router) {

    var usersRoute = router.route('/users');

    usersRoute.get(async function (req, res) {
        
        
        
        try {
            res.send({message: "OK", data: "Users Page"});
        } catch (err) {
            res.status(500).send({message: "Error", data: err})
        }
    });

    return router;
}