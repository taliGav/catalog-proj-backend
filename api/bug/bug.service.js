const dbService = require('../../services/db.service');
const mysql = require('mysql');
const logger = require('../../services/logger.service.js');
const tableName = 'bug';
const sqlCommand = `SELECT * FROM ${tableName}`;

async function query(filterBy = {}) {
  try {
    return dbService.runSQL(sqlCommand);
  } catch (err) {
    logger.error('cannot find bugs', err);
    throw err;
  }
}

async function getById(bugId) {
  try {
    const bugs = await dbService.runSQL(
      `${sqlCommand}  WHERE _id = ${mysql.escape(bugId)}` // Prevent injections
    );
    return bugs.length === 1 ? bugs[0] : Promise.reject();
  } catch (err) {
    logger.error(`while finding bug ${bugId}`, err);
    throw err;
  }
}

async function remove(bugId) {
  let sqlQuery = `DELETE FROM ${tableName} WHERE _id = ${mysql.escape(bugId)}`; // Prevent injections
  try {
    await dbService.runSQL(sqlQuery);
    return bugId;
  } catch (err) {
    logger.error(`cannot remove bug ${bugId}`, err);
    throw err;
  }
}

async function add(bug) {
  try {
    // Original Way
    // let sqlQuery = `INSERT INTO ${tableName} (name, description, severity, creator) VALUES ("${bug.name}",
    // "${bug.description}",
    // "${bug.severity}",
    // "${bug.creator}")`;
    // const okPacket = await dbService.runSQL(sqlQuery);

    //  shorter way
    let sqlQuery = `INSERT INTO ${tableName} SET ?`;
    const okPacket = await dbService.runSQL(sqlQuery, bug);

    return okPacket;
  } catch (err) {
    logger.error('cannot insert bug', err);
    throw err;
  }
}
async function update(bug) {
  try {
    // Original Way
    // let sqlQuery = `UPDATE ${tableName} SET name = "${
    //   bug.name
    // }", description = "${bug.description}"
    // , severity ="${bug.severity}" WHERE _id = ${mysql.escape(bug._id)}`;

    // const okPacket = await dbService.runSQL(sqlQuery);

    //  shorter way
    let sqlQuery = `UPDATE  ${tableName} SET ? WHERE _id = ?`;
    const okPacket = await dbService.runSQL(sqlQuery, [
      bug,

      mysql.escape(bug._id), // Prevent injections
    ]);

    console.log('updtaedBug', okPacket);
    return okPacket;
  } catch (err) {
    logger.error(`cannot update bug ${bug._id}`, err);
    throw err;
  }
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
};
