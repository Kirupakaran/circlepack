const fs = require('fs');

function processShipmentsFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split(/[\r\n]+/);
    const keys = lines[0].split(',').map(k => k.trim());
    const values = lines.slice(1);

    const mappedData = values.map(v => {
        const obj = {};
        v.split(',')
            .map(t => t.trim())
            .forEach((t, i) => {
                obj[keys[i]] = t;
            });
        return obj;
    });

    return {
        keys: keys, values: mappedData
    };
}

module.exports = {
    processShipmentsFile
};