const Task from '../models/task_model';

module.exports.create_task = (req, res) => {
  const { ownership, assignees, product, taskTitle, description } = req.body;
     const newTask = Task({ownership, assignees, product, taskTitle, description })
     newTask.save((err, task) => {
          if(err){
            return res.status(400).json({
              error: err
            })
          }
          return res.status(200).json({
            response: "Task created successfully"
          })
     })
}
