const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const privateChatSchema = mongoose.Schema({
        sender:{
           type: ObjectId,
           ref:'Member',
           required:true
         },
         reciever:{
           type: ObjectId,
           ref:'Member',
           required:true
         },
         isRead:{
           type: Boolean,
           default: false
         },
         datetime:{
           type: Date,
           required:true
         },
         message:{
           type: String
         }
})

module.exports = mongoose.model('PrivateChat', privateChatSchema);
