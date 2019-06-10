const uri = process.env.DB_CONNECTION_URI;
const initOptions = {
    connect(client, dc, useCount) {
        const cp = client.connectionParameters;
        console.log('Connected to database:', cp.database);
    }
};

const pgp = require('pg-promise')(initOptions);

const db = pgp(uri);

async function getData() {
    const data = await db.any('SELECT * FROM shipments_data');
    return data;
}

async function insertData(keys, values) {
    const cs = new pgp.helpers.ColumnSet(keys, {table: 'shipments_data'});
    const query = pgp.helpers.insert(values, cs);
    
    try {
        const result = await db.result(query);
        return result.rowCount;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

module.exports = {
    getData,
    insertData
}