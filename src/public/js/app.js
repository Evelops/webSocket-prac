const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message",input.value,roomName, ()=>{
        addMessage(`YOU: ${value}`);
    });
    input.value="";
}


function handleNicknameSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#name input");
    socket.emit("nickname",input.value);
}

/**
 * 채팅방 입장시, 서버로 전송하는 함수. 
 * 기존의 채팅방 입장 UI 를 제거하고, 채팅 전송하는 UI로 갱신한다.
*/
function showRoom() {
    welcome.hidden=true;
    room.hidden=false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    const msgForm =room.querySelector("#msg");
    const nameForm =room.querySelector("#name");
    msgForm.addEventListener("submit",handleMessageSubmit);
    nameForm.addEventListener("submit",handleNicknameSubmit);
}

/**
 * 채팅방 입장 버튼 submit 되었을 때, 실행하는 함수. 
*/
function handleRoomSubmit(event) {
    event.preventDefault(); 
    const input = form.querySelector("input");
    socket.emit("enter_room",input.value, showRoom);
    roomName = input.value;
    input.value="";
}


form.addEventListener("submit", handleRoomSubmit); 

//welcome 이라는 namespace를 받았을 경우, 다른 유저에게 입장한 내용을 표기해주는 구문.
socket.on("welcome",(user,newCount)=>{
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${user} arrived`);
});

//welcome 이라는 namespace를 받았을 경우, 다른 유저에게 입장한 내용을 표기해주는 구문.
socket.on("bye",(left,newCount)=>{
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${left} left`);
});

socket.on("new_message",addMessage);

// socket.on("room_change",(rooms)=>{
//     roomList.innerHTML="";
//     if(rooms.length === 0){
//         return;
//     }
//     const roomList = welcome.querySelector("ul");
//     rooms.forEach(room => {
//         const li = document.createElement("li");
//         li.innerText = room;
//         roomList.append(li);
//     })
// });