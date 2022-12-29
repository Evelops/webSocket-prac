const msgList = document.querySelector("ul");
const msgForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);

// 소켓이 connection을 open 했을 때 발생하는 이벤트 => 서버에서 on("connection") 했을 시, 발생.
socket.addEventListener("open",()=>{
    console.log("Connected to Server ✅");
});

// 소켓으로 날라온 메시지를 확인하는 리스너. 
socket.addEventListener("message", (message)=>{
    console.log(`Send to Message From the Server : ${message.data}`);
});

// 웹소켓이 닫혀있을 때, 실행되는 리스너.
socket.addEventListener("close",()=>{
    console.log(`discoonected to Server 🚫`);

});
// 소켓에서 에러발생을 알리는 리스너. 
socket.addEventListener("error",()=>{
    console.log(`WebSocket ERR!`)
});

function handleSubmit(event){
    event.preventDefault();
    const input = msgForm.querySelector("input");
    // console.log(input.value);
    socket.send(input.value);
    input.value="";
}

msgForm.addEventListener('submit',handleSubmit);