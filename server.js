const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cors = require("cors");
dotenv.config();

// STATIC FILES AND MIDDLEWARES
app.use(express.static("static"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

// CONTROLLERS
const postSignup = require("./controllers/postSignup");
const postLogin = require("./controllers/postlogin");

// MONGOOSE CONNECTIONS
const dbconnect = require("./models/mongoconfig");
dbconnect();

// ROUTES
app.post("/signup", postSignup);
app.post("/login", postLogin);

// SOCKETS
io.on("connection", (socket) => {
  console.log("user joined");
  socket.on("user-joined", (message) => {
    socket.broadcast.emit("user-joined", message);
  });

  socket.on("chat-message", (message) => {
    socket.broadcast.emit("chat-message", message);
    console.log(message);
  });
});

io.on("disconnect", (socket) => {
  console.log("a user disconnected");
});

server.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
