const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema({
       user: {
         type:ObjectId,
         ref:"GoogleUser",
         required:true
       },
       comment: {
         type: String,
         max: 1024
       },
       slug:{
         type: String
       },
       domain:{
         type: String
       }
}, { timestamps: true })

module.exports = mongoose.model("Comment", commentSchema)
