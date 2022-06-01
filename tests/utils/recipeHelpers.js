import connection from '../../src/database.js'

function endConnection() {
    return connection.end()
}

async function cleanDB() {
    await connection.query('TRUNCATE recipes RESTART IDENTITY');
}

export {
    endConnection,
    cleanDB
};