const mongoose = require("mongoose");
const config = require("../config/index");

mongoose.connect(config.BD_URL).then(() => {
    console.log("Db is connected");
}).catch(err => {
    if (err) {
        console.log(err);
    }
});

const User = require("./models/User");
const Item = require("./models/Item");


module.exports = {
    User,
    Item,
}