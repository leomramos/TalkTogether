const http = require("http");
const { Server } = require("socket.io");

const matchByLanguages = (userId, sockets) => {
  const uSocket = sockets[userId];

  return Object.entries(sockets)
    .filter(([id, socket]) => id !== userId && socket.quickMatch)
    .map(([id, socket]) => {
      const match = socket.languages.reduce((total, lang) => {
        const uLang = uSocket.languages.find(
          uLangs => uLangs.languageId === lang.languageId
        );

        if (!uLang) return total;

        const profDiff = Math.abs(lang.proficiency - uLang.proficiency);
        return total + (profDiff === 1 ? 2 : profDiff === 0 ? 1 : 3);
      }, 0);

      return {
        userId: id,
        match,
      };
    })
    .sort((cur, prev) => prev.match - cur.match);
};

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

      socket.broadcast.emit("userConnected", Object.keys(sockets));
      setTimeout(
        () =>
          io.to(socket.id).emit("connectionSuccessful", Object.keys(sockets)),
        [1500]
      );
    }

    socket.on(
      "changedLanguages",
      ({ id, languages }) => (sockets[id].languages = languages)
    );

    socket.on("usersUpdated", _ => io.emit("usersUpdated"));

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
      const sortedMatchList = matchByLanguages(userId, sockets);
      io.to(uSocket.socketId).emit("quickMatchSearched", sortedMatchList);
    });

    socket.on("message", ({ to, msg }) => {
      const ouSocket = sockets[to] || {};
      const uSocket = sockets[msg.from] || {};
      io.to(ouSocket.socketId).emit("message", msg);
      io.to([uSocket.socketId, ouSocket.socketId]).emit("newMessage");
    });

    socket.on("deletedMessage", ({ to, msg }) => {
      const ouSocket = sockets[to] || {};
      const uSocket = sockets[msg.from] || {};
      io.to([uSocket.socketId, ouSocket.socketId]).emit("deletedMessage");
    });

    socket.on("requestsUpdate", ({ to }) => {
      const ouSocket = sockets[to] || {};
      io.to(ouSocket.socketId).emit("requestsUpdate");
    });

    socket.on("changedPerms", ({ to }) => {
      const ouSocket = sockets[to] || {};
      io.to(ouSocket.socketId).emit("changedPerms");
    });

    socket.on("disconnect", _ => {
      sockets = Object.fromEntries(
        Object.entries(sockets).filter(skt => skt[1].socketId !== socket.id)
      );
      io.emit("userDisconnected", Object.keys(sockets));
    });
  });

  socket.listen(8080, () => {
    console.log("Socket.io listening on port 8080");
  });

  return io;
};
