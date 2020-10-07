const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const groupChatSchema = mongoose.Schema({
        from:{
           type: ObjectId,
           ref:'Member',
           required:true
         },
         toGroup:{
           type: ObjectId,
           ref:'Member',
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
