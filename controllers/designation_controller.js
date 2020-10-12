const Designation = require('../models/designation_model');
const { errorHandler } = require('../helpers/dbErrorHandler');

module.exports.create_designation = (req, res) => {
   const { designationName } = req.body;
  if(!designationName){
    return res.status(400).json({
      error:"Designation name is required"
    })
  }
  const newDesignation = Designation({
        designationName: designationName.toUpperCase()
      })
      newDesignation.save((err, response) => {
        if(err){
          return res.status(400).json({
            error: errorHandler(err)
          })
        }
        res.status(200).json({
          result: `new department ${response.designationName} is created`
        })
    })
}

module.exports.get_all_designations = (req, res) => {
   Designation.find()
    .populate('member', 'fullName email')
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
