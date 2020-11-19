/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router, db) {
    app.use('/api', require('./home.js')(router, db));
    app.use('/api/users', require('./users.js')(router, db));
    app.use('/api/classes', require('./classes.js')(router, db));
    app.use('/api/enrollments', require('./enrollments.js')(router, db));
    app.use('/api/teachers', require('./teachers.js')(router, db));
};
