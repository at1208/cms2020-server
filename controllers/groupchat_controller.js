const GroupChat = require('../models/groupchat_model');
const jwt = require('jsonwebtoken');

module.exports.socketio = (server) => {
  const io = require('socket.io')(server);
  io.path('/');

 const onlineUsers = []

 const online = (id) => {
 const result = onlineUsers.filter(item => item == id);
      if(result.length === 0){
         return  onlineUsers.push(id)
      }
 }

  // io.use((socket, next) => {
  //  let token = socket.handshake.query.token;
  //  if(token){
  //    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
  //        if(err){
  //          return;
  //        }
  //        return next();
  //    })
  //  }
  //  return next(new Error('authentication error'));
  // });


  io.on("connection", (socket) => {
       // online(socket.handshake.query.data)

       socket.on("disconnect", () => {
          onlineUsers.pop(socket.handshake.query.data)
          io.emit("ONLINE", {online: onlineUsers})
       })

       socket.on("new", (data) => {
         console.log(data)
       })

       io.emit("ONLINE", {online: onlineUsers})
  })
}
