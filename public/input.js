const socket = io();
form = document.getElementById("form");
input = document.getElementById("input");
chat = document.getElementById("chat");
userName = document.getElementById("userName");
let selectRoom = document.getElementById('selectRoom');
let formBtn = document.getElementById("formBtn");
formBtn = false;

let chatRoom = null;

//dandelion button click
// dandelionRoom.addEventListener("click", (e) => {
//   chatRoom = "dandelionRoom";
//   chat.innerHTML = null;
//   console.log("You choose dandelion class.");
// })


// let ele = document.getElementById('chatRoom');
// // 現在の visibility プロパティの値を保持
// const visibilityOriginal = ele.style.visibility;
// // hidden に設定して非表示
// ele.style.visibility = 'hidden';
// // 元に戻して表示
// ele.style.visibility = visibilityOriginal;

//alert
if (!input) {
  alert("Please choose chat room");
  document.getElementById("formBtn").disabled = true;
} 


//Select chat room
selectRoom.addEventListener('change', (e) => {
      var selectRoomResult = document.getElementById('selectRoomResult');
      selectRoomResult.textContent =  "Welcome to " + selectRoom.options[selectRoom.selectedIndex].textContent ;
      selectRoom = selectRoom.options[selectRoom.selectedIndex].textContent;
      console.log(selectRoom);

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


