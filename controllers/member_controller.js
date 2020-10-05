const Member = require('../models/member_model');

module.exports.get_all_members = (req, res) => {
    Member.find()
    .populate('designation', 'designationName')
    .populate('department', 'departmentName')
    .select('contactNumber email fullName')
    .exec((err, response) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      res.status(200).json({
        result: response
      })
    })
}

module.exports.get_member_by_id = (req, res) => {
  Member.findById(req.params.id)
  .populate('designation', 'designationName')
  .populate('department', 'departmentName')
  .select('contactNumber email fullName photo')
  .exec((err, response) => {
    if(err){
      return res.status(400).json({
        error: err
      })
    }
    res.status(200).json({
      result: response
    })
  })
}
