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

module.exports = {
    getData
}