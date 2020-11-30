const GroupChat = require("../models/groupchat_model");

module.exports = function(server){

  const io = require('socket.io')(server);
  const group = io.of('/groupchat');

     group.on('connection', (socket) => {
        const {room} = socket.handshake.query;

        socket.on('join', () => {
             socket.join(room)
        });

        socket.on('createMessage', async (message) => {
            const msg = GroupChat(message)
            await msg.save((err, response) => {
               if(err){
                 return console.log(err)
               }
               GroupChat.findById(response._id)
               .populate("sender", "photo fullName")
               .exec((err, result) => {
                 if(err){
                   return console.log(err)
                 }
                  group.to(room).emit('newMessage', result);
               })
            })


        });

        socket.on("typing", (typing) => {
            group.to(room).emit('activity', typing);
        })

        socket.on('disconnect', () => {

        })
   });
}
