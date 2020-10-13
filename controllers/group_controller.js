const Group = require('../models/group_model');
const GroupChat = require('../models/groupchat_model');
const { errorHandler } = require('../helpers/dbErrorHandler');

module.exports.create_group = (req, res) => {
    const { name, member } = req.body;
    const newGroup = Group({
      name, member
    })
    newGroup.save((err, result) => {
      if(err){
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      res.status(200).json({
        message: "Group create successfully"
      })
    })
}

module.exports.get_group_chats = (req, res) => {
   GroupChat.find({ group: req.params.id })
   .populate("sender", "fullName photo")
   .exec((err, result) =>{
     if(err){
       return res.status(400).json({
         error: err
       })
     }
      res.status(200).json({
        result: result
      })
   })
}
