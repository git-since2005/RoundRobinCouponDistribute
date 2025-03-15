const mongo = require("mongoose")

const Feedbacks = new mongo.Schema({
    name:{
        type: String,
        required: true
    },
    feed:{
        type: String,
        required: true
    }
})
const Feedback = mongo.model("Feedback", Feedbacks)
module.exports = Feedback