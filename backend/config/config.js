const sql = require('mssql');
require('dotenv').config();

const config = {
  user: secret.env.SERVER_USER,
  password: secret.env.SERVER_PASSWORD,
  server: secret.env.SERVER,
  database: 'vmaint'
};

let aList;

async function getList() {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .query('SELECT item1, item2, item3, item4 FROM items');

    aList = result.recordset;
    console.dir(aList);
    pool.close();
  } catch (err) {
    console.log(err);
  }
}

async function vList() {
   if (!aList) {
      await getList();
   }
   if (!aList) {
      throw new Error('Could not get items');
   }
   return aList;
}

module.exports = vList;