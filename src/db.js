const uri = process.env.DB_CONNECTION_URI;

const pgp = require('pg-promise')();

const db = pgp(uri);

async function getData() {
    return db.task(async t => {
        let config = null;
        try {
            config = await t.one('SELECT * FROM config');
        } catch (e) {
            console.error(e);
        }

        if (config != null) {
            const data = await t.any('SELECT $1:name, $2:name, $3:name, $4:name, $5:name, $6:name, $7:name FROM $8:name', [
                config.master_circle,
                config.parent_circle,
                config.children_circle,
                config.parent_size,
                config.children_size,
                config.parent_tooltip,
                config.children_tooltip,
                config.table_name
            ]);

            return { config: config, values: data }
        } else return null;
    });
}

async function insertData(table, keys, values) {
    const cs = new pgp.helpers.ColumnSet(keys, {table: table});
    const query = pgp.helpers.insert(values, cs);
    
    try {
        return db.task(async t => {
            await t.none('DELETE FROM $1:name', table);
            const result = await t.result(query);
            return result.rowCount;
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
}

module.exports = {
    getData,
    insertData
}