const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const taskSchema = mongoose.Schema({
    ownership:[{
      type: ObjectId,
      ref:"Member",
      required:true
    }],
    assignees:[{
      type: ObjectId,
      ref:"Member",
      required:true
    }],
    product:{
      type: ObjectId,
      ref:"Product",
      required:true
    },
     taskTitle:{
      type:String,
      trim:true
    },
    description:{
      type:String,
      trim:true
    },
    status:{
      type: String,
      enum:['open', 'done'],
      default:'open'
    }

}, { timestamp: true })

module.exports = mongoose.model('Task', taskSchema);
