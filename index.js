const validate = require('./validate');
const db = require('./db_controller');

const express = require('express');
const app = express();
const PORT_NUMBER = process.env.PORT || 3000;

const volleyball = require('volleyball');

app.listen(PORT_NUMBER, () => console.log("listening on " + PORT_NUMBER));

app.use(express.static('public'));
app.use(express.json());
app.use(volleyball);

app.get('/api/getip', async(req, res, next) => {
    const ip = await db.get_last_ip();
    if (!ip) return next(new Error('ip cannot found'));
    res.json(ip);
})

app.post('/api/setip', async(req, res, next) => {
    const valid = validate.isValidSetIp(req.body, next);
    if (!valid.valid) return next(valid.error);

    const ip = await db.get_last_ip();
    if (ip && ip.ip === req.body.ip) {
        res.send('Ok. Same ip no change.')
    } else {
        db.insert_ip(req.body.name, req.body.ip);
        res.send('Ok.');
    }

})