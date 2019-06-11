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

function processConfigFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const configJson = JSON.parse(data).loadMaster[0];

    const config = {
        table_name: configJson['table'],
    }

    Object.keys(configJson).forEach(k => {
        if (k != 'table') config[k.replace(' ', '_')] = configJson[k];
    });

    return config;
}

function transformData(data) {
    const transformedData = {};
    transformedData.name = data.values[0][data.config.master_circle];
    transformedData.children = getChildren(transformedData.name, data.config.master_circle, data.config.parent_circle, data.config.parent_size, data.config.parent_tooltip, data.values);

    transformedData.children.forEach(p => {
        p.children = getChildren(p.name, data.config.parent_circle, data.config.children_circle, data.config.children_size, data.config.children_tooltip, data.values);
    });

    return transformedData;
}

function getChildren(parentId, parentKey, childrenKey, childrenSizeKey, childrenTooltipKey, values) {
    const children = [];
    const ids = new Set();
    values
    .filter(v => v[parentKey] == parentId)
    .forEach(v => {
        const node = {
            name: v[childrenKey],
            size: v[childrenSizeKey],
            tooltip: v[childrenTooltipKey]
        }
        if (!ids.has(v[childrenKey])) {
            ids.add(node.name);
            children.push(node);
        }
    });

    return children;
}

module.exports = {
    processShipmentsFile,
    processConfigFile,
    transformData
};