let log = console.log
require("dotenv").config()
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mongo = require("mongoose")
const {randomUUID} = require("crypto")
const cookieParser = require("cookie-parser")
require("./db")();
const mongoSanitize = require('express-mongo-sanitize');
const cors = require("cors")

const Coupons = require("./Models/Coupon")
const Sessions = require("./Models/Session")
const Feedback = require("./Models/Feedback")
const app = express()
app.use(express.json())
app.use(mongoSanitize());

app.use(cors({"origin":"*"}))

app.use(cookieParser());
app.use((req, res, next) => {
    req.clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    next();
});

app.get("/", async(req, res)=>{
    return res.json({"this":`${Coupons.find({"userID":req.clientIp}).length>0?"You do own.":"You don't own."}`})
})

app.get("/get-coupons", async(req, res)=>{
    return res.json({"coupons":await Coupons.find()})
})

app.post("/claim", async(req, res)=>{
    let data = req.body
    let checker = await Sessions.find({"userID":req.clientIp})
    if (checker.length>0) {
        return res.json({"status":"waiting"})
    }else{
        await Coupons.updateOne({"token" : data.token}, {"$set":{userID:`${req.clientIp}`, claimed:true, claimedAt:new Date()}})
        console.log(data.token, req.body)
        let session = new Sessions({"userID":req.clientIp, "expires": new Date()})
        session.save()
        console.log("Here")
        return res.json({"status":"done"})
    }
})

app.post("/save-feedback", async(req, res)=>{
    let data = req.body
    let inserter = await Feedback({"feed":data.feed, "name":data.name, "ip":req.clientIp})
    inserter.save()
    if(inserter){
        return res.json({"status":"ok"})
    }else{
        return res.json({"status":"server"})
    }
})

app.listen(8000, ()=>{
    log("Connected to port 5000")
})
