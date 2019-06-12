const express = require('express');
const multer  = require('multer');
const fs = require('fs');
const db = require('./db');
const util = require('./util');

const app = express();
app.use(express.json());

const upload = multer({ dest: 'uploads/' })

app.use(express.static(__dirname + '/../public'));

app.get('/shipments', async (req, res) => {
    const data = await db.getData();
    if (data && data.values.length != 0) {
        const transformedData = util.transformData(data);
        res.send(transformedData);
    } else {
        res.send({});
    }
});

app.post('/config/upload', upload.single('file'), async (req, res, next) => {
    try {
        const config = util.processConfigFile(req.file.path);
        const rowCount = await db.insertData('config', Object.keys(config), [config]);
        res.send({ rowCount: rowCount});
    } catch (e) {
        next(e);
    }
});

app.post('/shipments/upload', upload.single('file'), async (req, res) => {
    try {
        const data = util.processShipmentsFile(req.file.path);
        const rowCount = await db.insertData('shipments_data', data.keys, data.values);
        res.send({ rowCount: rowCount});
    } catch (e) {
        next(e);
    }
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ error: "Failed to process request"});
});
  
module.exports = app;