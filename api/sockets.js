const http = require("http");
const { Server } = require("socket.io");

let sockets = {};

module.exports = app => {
  const socket = http.createServer(app);
  const io = new Server(socket);

  setInterval(() => {
    console.log(sockets);
  }, [10 * 1000]);

  io.on("connection", socket => {
    if (socket.handshake.query.user) {
      const { id, languages } = JSON.parse(socket.handshake.query.user);
      sockets[id] = { socketId: socket.id, languages };
    }

    socket.on(
      "changedLanguages",
      ({ id, languages }) => (sockets[id].languages = languages)
    );

    socket.on("quickMatchJoin", userId => {
      const uSocket = sockets[userId];
      sockets[userId] = { ...uSocket, quickMatch: true };
      io.to(uSocket.socketId).emit("quickMatchJoined");
    });
    socket.on("quickMatchLeave", userId => {
      const uSocket = sockets[userId];
      sockets[userId] = { ...uSocket, quickMatch: false };
      io.to(uSocket.socketId).emit("quickMatchLeft");
    });
    socket.on("quickMatchSearch", userId => {
      const uSocket = sockets[userId];

      Object.entries(sockets)
        .filter(([id, socket]) => id !== userId && socket.quickMatch)
        .map(([id, info]) => console.log(id, info));

      io.to(uSocket.socketId).emit("quickMatchSearched");
    });

    socket.on(
      "disconnect",
      _ =>
        (sockets = Object.fromEntries(
          Object.entries(sockets).filter(skt => skt[1].socketId !== socket.id)
        ))
    );
  });

  socket.listen(8080, () => {
    console.log("Socket.io listening on port 8080");
  });

  return io;
};
