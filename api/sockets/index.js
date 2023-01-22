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
      console.log("match", match);

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
      const sortedMatchList = matchByLanguages(userId, sockets);

      console.log(sortedMatchList);

      io.to(uSocket.socketId).emit("quickMatchSearched", sortedMatchList);
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
