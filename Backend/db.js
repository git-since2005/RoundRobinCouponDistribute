const mongo = require("mongoose")
const connectDB = async()=>await mongo.connect(process.env.uri, {
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected DATABASE!")
}).catch(()=>{
    console.log("Database isn't responding.")
})

module.exports = connectDB