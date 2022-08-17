const socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
let chat = document.getElementById("chat");
const userName = document.getElementById("userName");
const selectRoom = document.getElementById('selectRoom');
const formBtn = document.getElementById("formBtn");

let chatRoom = null;

// let ele = document.getElementById('chatRoom');
// // 現在の visibility プロパティの値を保持
// const visibilityOriginal = ele.style.visibility;
// // hidden に設定して非表示
// ele.style.visibility = 'hidden';
// // 元に戻して表示
// ele.style.visibility = visibilityOriginal;

//alert
if (!chatRoom) {
  formBtn.disabled = true;
  selectRoom.selectedIndex = 0;
  alert("Please choose chat room");
} 


//Select chat room
selectRoom.addEventListener('change', (e) => {
      chatRoom = selectRoom.options[selectRoom.selectedIndex].textContent;
      var selectRoomResult = document.getElementById('selectRoomResult');
      console.log(chatRoom);
      selectRoomResult.textContent =  "Welcome to " + chatRoom ;
      formBtn.disabled = false;

      let ele = document.getElementById('chatRoom');
      const visibilityOriginal = ele.style.visibility;
      // ele.style.visibility = 'hidden';
      ele.style.visibility = visibilityOriginal;
      
      //selectRoom hidden
      let el = document.getElementById('selectRoom');
      const visibleElement = el.style.visibility;
      el.style.visibility = 'hidden';
      //el.style.visibility = visibleElement;

      //Show HTML
      let room = document.getElementById("room");
      room.textContent = `Welcome  ❤️ You are logged in now! `;

      
    });

//Button click (save message & Save Name)
form.addEventListener("submit", function(e){
  e.preventDefault();
  if(input.value){
    let msg = input.value;
    let user = userName.value;
    socket.emit("chat message", {msg, userName: user, room: chatRoom});
    input.value = null;
    userName.value = null;
  }
});

socket.on("chat message", function({msg, userName, room}){
    if(!userName) { 
        userName = "Anonymous 👹";
    }
    if (room != chatRoom) {
      //console.log("Oops, wrong room: " + room + " != my room " + chatRoom)
      return;
    }
    chat = document.getElementById("chat");
    chat.insertAdjacentHTML("beforeend", "<li>" + userName + ":" +  msg + "(" + room + ")" + "</li>");
});


