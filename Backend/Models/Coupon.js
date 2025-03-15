const mongo = require("mongoose")

const Coupon = mongo.Schema({
    token:{
        type: String,
        unique: true,
        required: true
    },
    claimed:{
        type: Boolean,
        required: true,
        default: false
    },
    userID:{
        type: String,
        default:null
    },
    claimedAt:{
        type:Date,
        default:null
    },
    expiresAt:{
        type: Date,
        required: true,
    }
})

const Coupons = mongo.model("Coupons", Coupon)

module.exports = Coupons;