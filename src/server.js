import http from "http";
import ws from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
// redirect -> 유저가 어떤 값을 주소값에 입력해도 메인으로 돌아가게끔 설정해주는 메서드.
app.get("/*", (req, res) => res.redirect("/"));

// app.listen(3000,()=>{console.log('localhost:3000 run');});

//http서버
const server = http.createServer(app);
//webSocket 서버
const wss = new ws.Server({ server });

// function handleConnection(socket) {
//     console.log(socket);
// }

const sockets = [];

// 웹 소켓에서 맨 처음 연결할 때, 클라이언트가 서버로 요청을 보내어 연결을 성공했을 때, 웹 소켓에서 실행하는 구문. 소켓 서버에 연결한 소켓의 정보를 가지고 있음.
wss.on("connection", (socket) => {
  // 소켓서버에 연결한 소켓을 ojbect에 넣어줌.
  sockets.push(socket); 
  console.log("Connected to Browser");

  socket.on("close", () => console.log("client close"));
  socket.on("message", (message) => {
    // 클라이언트에서 전송 받은 데이터를 다시 리턴해줌
    sockets.forEach(aSocket => aSocket.send(message.toString()));
    // socket.send(message.toString()); 
  });
  socket.send("hello");
});

server.listen(3000, () => console.log("ws & http server start with 3000 port"));
