const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const contactSchema = mongoose.Schema({
      name:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true
      },
      phone:{
        type:String,
        required:true
      },
      contactType:{
        type:String,
        enum:['core','employee'],
        default: 'employee'
      },
      status:{
        type: Boolean,
        default: true
      }
},{ timestamps: true })

module.exports = mongoose.model('Contact', contactSchema);
