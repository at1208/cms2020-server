const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const contactSchema = mongoose.Schema({
      member:[{
        type: ObjectId,
        ref: 'Member'
     }]
},{ timestamps: true })

module.exports = mongoose.model('Contact', contactSchema);
