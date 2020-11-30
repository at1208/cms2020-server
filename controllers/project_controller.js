const Project = require('../models/project_model');
const { errorHandler } = require('../helpers/dbErrorHandler');

module.exports.create_project = (req, res) => {
   const { projectName,
           domainAddress,
           teamLeader,
           projectLogo,
           teamMember } = req.body;



  const newProject = Project({
        projectName,
        domainAddress: domainAddress.toLowerCase(),
        teamLeader,
        projectLogo,
        teamMember
      })
      newProject.save((err, response) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }
        res.status(200).json({
          result: `new product ${response.projectName} is created`
        })
    })
}

module.exports.get_all_project = (req, res) => {
  Project.find()
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
