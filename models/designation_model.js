const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const designationSchema = mongoose.Schema({
      designationName: {
        type: String,
        unique: true,
        trim: true
      },
      member:[{
        type: ObjectId,
        ref: 'Employee'
     }]
},{ timestamps: true })

module.exports = mongoose.model('Designation', designationSchema);
