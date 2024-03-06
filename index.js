const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("ready", (message) => {
    socket.broadcast.emit("ready", message);
  });

  socket.on("ask", (message) => {
    socket.broadcast.emit("ask", message);
  });

  socket.on("answer", (message) => {
    socket.broadcast.emit("answer", message);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("disconnected-user");
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 3004;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// previously used functionality
// ---------------------------------------------------------------------------

// const { username } = socket.handshake.query;

// socket.join(`user_${username}`);

// let clentsList = Array.from(io.sockets.sockets, ([_, value]) => value);
// clentsList = clentsList.map((client) => client.handshake.query.username);
// clentsList = clentsList.filter((client) => client !== username);

// // To the client that just connected
// io.to(`user_${username}`).emit("on_connect", clentsList);

// // To the other clients
// socket.broadcast.emit("new_user_connected", username);

// console.log("A user connected - ", username);

// ---------------------------------------------------------------------------

// fs.readFile("./db.json", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   const messages = JSON.parse(data);
//   messages.push(message);
//   fs.writeFile("./db.json", JSON.stringify(messages, null, 2), (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     if (message.to) {
//       io.to(`user_${message.to}`).emit("new_message", message);
//     }
//   });
// });

// ---------------------------------------------------------------------------

// fs.readFile("./db.json", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   const messages = JSON.parse(data);
//   const filteredMessages = messages.filter(
//     (message) =>
//       (message.from === friendUsername && message.to === username) ||
//       (message.from === username && message.to === friendUsername)
//   );
//   socket.emit("load_messages", filteredMessages);
// });

// ---------------------------------------------------------------------------

// socket.broadcast.emit("user_disconnected", username);
