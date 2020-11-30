const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
       email: String,
       name: String,
       picture: String,
       domain:String
}, { timestamps: true })

module.exports = mongoose.model("GoogleUser", googleUserSchema)
