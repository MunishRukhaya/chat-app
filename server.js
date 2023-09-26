const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const jwt = require('jsonwebtoken');

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// SOCKET SERVER
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

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

const userProtect = (req)=> {
  if(req.cookies.login) {
    const isLogin = jwt.verify(req.cookies.login, process.env.JWT_KEY);
    if(isLogin) {
      return true;
    }
  }
  return false;
}

// ROUTES
app.get('/', (req,res)=> {
  const isLogin = userProtect(req);
  if(isLogin) {
    res.redirect('/chat.html');
  } else {
    res.redirect('/signup.html');
  }
})

app.get('/signup', (req,res)=> {
  res.redirect('/signup.html');
})
app.get('/login', (req,res)=> {
  res.redirect('/login.html');
})


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
