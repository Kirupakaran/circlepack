const express = require('express');
const multer  = require('multer');
const fs = require('fs');
const db = require('./db');
const util = require('./util');

const app = express();
app.use(express.json());
const upload = multer({ dest: 'uploads/' })

app.get('/api/shipments', async (req, res) => {
    const data = await db.getData();
    res.send(data);
});

app.post('/shipments/upload', upload.single('shipments'), async (req, res) => {
    const data = util.processShipmentsFile(req.file.path);
    const rowCount = await db.insertData(data.keys, data.values);
    res.send({ rowCount: rowCount});
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status).json({
        errors: err.errors,
    });
});

module.exports = app;