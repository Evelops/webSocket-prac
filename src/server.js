import http from "http";
import socketIO from "socket.io";
// import ws from "ws";
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
//http & socket.io 를 동시에 사용.
const io = socketIO(server);

function publicRooms(){
    const {
        sockets:{
            adapter:{sids,rooms},
        },
    }=io;
    const publicRooms = [];
    rooms.forEach((_,key)=>{
        if(sids.get(key) === undefined){
            publicRooms.push(key);
        }
    });
    return publicRooms;

    // const sids = io.sockets.adapter.sids;
    // const rooms = io.sockets.adapter.rooms;
}

// socket.io에서 생성한 room 의 크기가 얼마나 큰지 계산만 해주는 함수.  ㄴ
function countRoom(roomName){
   return io.sockets.adapter.rooms.get(roomName)?.size;
}

// 소켓 클라이언트에서 연결 성공시, 실행되는 구문. 
io.on("connection", (socket) => {
    socket["nickname"] = "Anonymous";
    socket.onAny((event)=>{
        console.log(io.sockets.adapter);
        console.log(`Socket Event" ${event}`);
    });

    // socket.io는 클라이언트에서 넘겨받은 함수를 클라이언트에서 실행시킬 수 있음. 그냥 순차적으로 이루어진다고 생각하면 됌. 
    // done=> 클라이언트에서 넘겨받은 함수. 
    socket.on("enter_room", (roomName,done)=>{
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome",socket.nicknam, countRoom(roomName));
        io.sockets.emit("room_change",publicRooms());
    });
    socket.on("disconnecting",()=>{
        socket.rooms.forEach(room => 
            socket.to(room).emit("bye",socket.nickname,countRoom(room)-1));
    });
    socket.on("disconnect",()=>{
        io.sockets.emit("room_change",publicRooms());
    });
    socket.on("new_message",(msg,room,done)=>{
        socket.to(room).emit("new_message",`${socket.nickname}:${msg}`);
        done();
    });
    socket.on("nickname", (nickname)=>(socket["nickname"]=nickname));
});


//webSocket 서버
// const wss = new ws.Server({ server });

// function handleConnection(socket) {
//     console.log(socket);
// }

// const sockets = [];
// // 웹 소켓에서 맨 처음 연결할 때, 클라이언트가 서버로 요청을 보내어 연결을 성공했을 때, 웹 소켓에서 실행하는 구문. 소켓 서버에 연결한 소켓의 정보를 가지고 있음.
// wss.on("connection", (socket) => {
//   // 소켓서버에 연결한 소켓을 ojbect에 넣어줌.
//   sockets.push(socket); 
//   console.log("Connected to Browser");

//   socket.on("close", () => console.log("client close"));
//   socket.on("message", (message) => {
//     // 클라이언트에서 전송 받은 데이터를 다시 리턴해줌
//     sockets.forEach(aSocket => aSocket.send(message.toString()));
//     // socket.send(message.toString()); 
//   });
//   socket.send("hello");
// });

server.listen(3000, () => console.log("ws & http server start with 3000 port"));
