const io = require("../socket").getIo;

let connectedUsers = [];

module.exports = function (socket) {
  socket.on("join", ({user}) => {
    user = { id: socket.id, user };

    connectedUsers.push(user);
    console.log(connectedUsers)
    // socket.join(username+'-'+reciver);
  });

  socket.on("leave", ({user}) => {
    connectedUsers = connectedUsers.filter(item => item.user !== user)
    console.log(connectedUsers)

  });
  socket.on("private message", ({sender, reciver, message}, cb) => {
    const getReciver = connectedUsers.find((d) => d.user === reciver);
    if(getReciver){
      const {id} = getReciver;
      // console.log(id); 
      const msg = {message, sender, reciver}
      socket.emit('recive message', msg);
      socket.to(id).emit('recive message', msg);
      cb();
    }
  })

  // const userAddedInProject = 
  // socket.emit("")

  socket.on("disconnect", ({user}) => {
    //
    console.log(user)
    console.log("disconnect user");
  });
};
