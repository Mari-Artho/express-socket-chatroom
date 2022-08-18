const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
let chat = document.getElementById("chat");
const userName = document.getElementById("userName");
const selectRoom = document.getElementById('selectRoom');
const formBtn = document.getElementById("formBtn");

let chatRoom = null;
let user = null;

//alert
// if (!chatRoom) {
//   formBtn.disabled = true;
//   selectRoom.selectedIndex = 0;
//   alert("Please choose chat room");
// } 

//Select chat room
selectRoom.addEventListener('change', (e) => {
  chatRoom = selectRoom.options[selectRoom.selectedIndex].textContent;
  var selectRoomResult = document.getElementById('selectRoomResult');
  console.log(chatRoom);
  selectRoomResult.textContent =  "Welcome to " + chatRoom ;
  //selectRoomResult.setAttribute("id", "chatRoom");
  formBtn.disabled = false;
  
  //selectRoom hidden
  let el = document.getElementById('selectRoom');
  const visibleElement = el.style.visibility;
  el.style.visibility = 'hidden';
});

//button click (save message & name)
form.addEventListener("submit", function(e){
  e.preventDefault();
  if(input.value){
    let msg = input.value;
    user = userName.value;
    socket.emit("chat message", {msg, userName: user, room: chatRoom});
    input.value = null;
  }
});

//socket.on
socket.on("chat message", function({msg, userName, room}){
    if(!userName) { 
        userName = "Anonymous 👹";
    }
    if (room != chatRoom) {
      console.log("Oops, wrong room: " + room + " != my room " + chatRoom)
      return;
    }
    chat = document.getElementById("chat");
    //find yourself
    if (user == userName) {
      userName = "<b>" + userName + "</b>";
      chat.insertAdjacentHTML("beforeend", "<li class='myName'>" + userName + " : " +  msg +  "</li>");
    }  else{
    chat.insertAdjacentHTML("beforeend", "<li class='yourName'>" + userName + " : " +  msg +  "</li>")};
});


