const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const groupChatSchema = mongoose.Schema({
        sender:{
           type: ObjectId,
           ref:'Member',
           required:true
         },
         group:{
           type: ObjectId,
           ref:'Group',
           required:true
         },
         message:{
           type: String
         }
}, { timestamp: true })

module.exports = mongoose.model('GroupChat', groupChatSchema);
