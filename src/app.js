const mongoose = require("mongoose")
const express = require("express");
const app = express();
const hbs = require("hbs")
const path = require("path")
const PORT = 4000;
const url = "mongodb://127.0.0.1:27017/10Mar"
const bodyparser = require("body-parser")

mongoose.connect(url).then(() => {
    console.log("Db Connected");
}).catch(err => {
    console.log(err);
})

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
const viewPath = path.join(__dirname, "../template/views")
app.set("view engine", "hbs")
app.set("views", viewPath)

const userrouter = require("../router/userrouter")
app.use("/", userrouter)

app.listen(PORT, () => {
    console.log("Server running on port:" + PORT);
})