const mongoose = require("../config/database")

const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    role : {type : String, enum : ["admin", "customer"], default : "customer"}
})

const User = mongoose.model("User",userSchema)
module.exports = User 