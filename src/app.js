const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

app.get('/api/shipments', (req, res) => {
    const data = await db.getData();
    res.send(data);
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status).json({
        errors: err.errors,
    });
});

module.exports = app;