const socket = io();
form = document.getElementById("form");
input = document.getElementById("input");
userName = document.getElementById("userName");

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


