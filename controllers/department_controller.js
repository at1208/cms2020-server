const Department = require('../models/department_model');
const { errorHandler } = require('../helpers/dbErrorHandler');

module.exports.create_department = (req, res) => {
   const { departmentName } = req.body;
  if(!departmentName){
    return res.status(400).json({
      error:"Department name is required"
    })
  }
  const newDepartment = Department({
        departmentName: departmentName.toUpperCase()
      })
      newDepartment.save((err, response) => {
        if(err){
          return res.status(400).json({
            error: errorHandler(err)
          })
        }
        res.status(200).json({
          result: `new department ${response.departmentName} is created`
        })
    })
}

module.exports.get_all_departments = (req, res) => {
   Department.find()
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
