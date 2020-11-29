/*
 * You generally want to .gitignore this file to prevent important credentials from being stored on your public repo.
 */
// require('dotenv').config();

module.exports = {
    token : "secret-starter-mern",
    mongo_connection : "mongodb+srv://admin:abcd@1234@cluster0.agp9a.mongodb.net/MangoDB?retryWrites=true&w=majority",
    // mongo_connection : "mongodb+srv://admin:admin@borrowme.q3qtp.mongodb.net/BorrowMe?retryWrites=true&w=majority",
    sql_connection : "mysql://MangoBB-3135376c16:mbb049jagd@mysql.stackcp.com:55948/MangoBB-3135376c16?debug=true",
};
