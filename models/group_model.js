const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const groupSchema = mongoose.Schema({
         name:{
          type: String,
           unique: true,
           required:true
         },
         member:[{
           type: ObjectId,
           ref:'Member',
           required:true
         }],
         admin:[{
           type: ObjectId,
           ref:'Member',
           required:true
         }]

}, { timestamp: true })

module.exports = mongoose.model('Group', groupSchema);
