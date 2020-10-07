const userEmail = []

module.exports = (io) => {
 io.on("connection", (socket) => {
   socket.emit("online", {online: userEmail })
    socket.on("socketInfo", (user) => {
      console.log(user)
      userEmail.push(user.data)
    })

    socket.on("disconnect", (user) => {
        userEmail.pop(user.data)
        console.log(user)
           socket.emit("online", {online: userEmail })
    })

    socket.on("message", (message) => {
         io.emit("message", {data: message})

    })
 })
}
