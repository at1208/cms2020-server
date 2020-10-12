const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const departmentSchema = mongoose.Schema({
      departmentName: {
        type: String,
        unique: true,
        trim: true
      },
      member:[{
        type: ObjectId,
        ref: 'Member'
     }]
},{ timestamps: true })

module.exports = mongoose.model('Department', departmentSchema);
