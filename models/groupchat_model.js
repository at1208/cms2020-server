const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const groupChatSchema = mongoose.Schema({
        sender:{
          type: String,
           // type: ObjectId,
           // ref:'Member',
           required:true
         },
         group:{
           type: String,
           // type: ObjectId,
           // ref:'Member',
           required:true
         },
         datetime:{
           type: Date,
           required:true
         },
         message:{
           type: String
         }
})

module.exports = mongoose.model('GroupChat', groupChatSchema);
