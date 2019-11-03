require('dotenv').config()
require('./lib/response')
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/", function (req, res, next) {
    res.send(global.response.success());
});

app.use("/orders", require("./routes/orders/index"));

app.use(function (req, res, next) {
    res.status("404").send("Not found")
});
app.listen(process.env.REST_PORT, function () {
    console.log(`-> Listening on port :${process.env.REST_PORT}`)
});

module.exports = app