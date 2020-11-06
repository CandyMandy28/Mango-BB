module.exports = function (router, db) {

    var homeRoute = router.route('/');

    homeRoute.get(function (req, res) {
        res.json({ message: 'Please use a valid route'});
    });

    return router;
}
