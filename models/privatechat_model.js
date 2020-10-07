const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const privateChatSchema = mongoose.Schema({
        from:{
           type: ObjectId,
           ref:'Member',
           required:true
         },
         to:{
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

module.exports = mongoose.model('PrivateChat', privateChatSchema);
