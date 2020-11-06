/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router, db) {
    app.use('/api', require('./home.js')(router, db));
    app.use('/api/users', require('./questions.js')(router, db));
    app.use('/api/classes-s', require('./classes-student.js')(router, db));
    // app.use('/api/classes-t', require('./classes-teacher.js')(router, db));
};
