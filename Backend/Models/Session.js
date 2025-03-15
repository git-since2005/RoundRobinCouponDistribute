const mongo = require("mongoose")

const Session = new mongo.Schema({
    userID:{
        type: String,
        required: true
    },
    expires:{
        type:Date,
        required: true
    }
})
const Sessions = mongo.model("session", Session)
module.exports = Sessions