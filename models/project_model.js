const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const projectSchema = mongoose.Schema({
      projectName: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      domainAddress: {
        type: String,
        required: true,
        trim: true
      },
      projectLogo: {
        type: String
      },
      teamMember: [{
        type: ObjectId,
        ref: 'Member'
     }],
     teamLeader:{
       type: ObjectId,
       ref: 'Member'
     }

},{ timestamps: true })

module.exports = mongoose.model('Product', projectSchema);
