const GroupChat = require("../models/groupchat_model");

module.exports = function(server){

const { Users } =  require('../helpers/userClass')
const io = require('socket.io')(server);
const users = new Users();

             console.log(users.GetUsersList('content'))

     io.on('connection', (socket) => {
        const {room} = socket.handshake.query;

        socket.on('join', () => {
             socket.join(room)
             // io.to(room).emit('usersList', users.GetUsersList(room));
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
                  io.to(room).emit('newMessage', result);
               })
            })


        });

        socket.on("typing", (typing) => {
            io.to(room).emit('activity', typing);
        })

        socket.on('disconnect', () => {
            // var user = users.RemoveUser(socket.id);
            //
            // if(user){
            //     io.to(user.room).emit('usersList', users.GetUsersList(user.room));
            // }
        })
   });
}
