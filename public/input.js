const socket = io();
form = document.getElementById("form");
input = document.getElementById("input");
chat = document.getElementById("chat");
userName = document.getElementById("userName");
dandelionRoom = document.getElementById("dandelionRoom");

let chatRoom = null;

//dandelion button click
// dandelionRoom.addEventListener("click", (e) => {
//   chatRoom = "dandelionRoom";
//   chat.innerHTML = null;
//   console.log("You choose dandelion class.");
// })

//Select chat room
var room = document.getElementById('room');
room.addEventListener('change', (e) => {
      var selectRoom = document.getElementById('selectRoom');
      selectRoom.textContent =  "You choose :" + room.options[room.selectedIndex].textContent;
      room = room.options[room.selectedIndex].textContent;
      console.log(room);
    });

//Button click (save message & Save Name)
form.addEventListener("submit", function(e){
  e.preventDefault();
  if(input.value){
    let msg = input.value;
    let user = userName.value;
    socket.emit("chat message", {msg, userName: user});
    input.value = null;
    userName.value = null;
  }
});

socket.on("chat message", function({msg, userName}){
    if(!userName) { 
        userName = "Anonymous 👹";
    }
    chat = document.getElementById("chat");
    chat.insertAdjacentHTML("beforeend", "<li>" + userName + ":" +  msg + "</li>");
});


