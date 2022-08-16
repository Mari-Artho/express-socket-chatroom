const socket = io();
form = document.getElementById("form");
input = document.getElementById("input");
userName = document.getElementById("userName");

//Save message & Save Name
form.addEventListener("submit", function(e){
  e.preventDefault();
  if(input.value && userName.value){
    // ここのnameが怪しい。後でチェック。
    let msg = input.value;
    let user = userName.value;
    socket.emit("chat message", {msg, userName: user});
    input.value = null;
    userName.value = null;
  }
});

//Save Name
// inputName.addEventListener("submit", function(e){
//     e.preventDefault();
//     if(userName.value){
//         socket.emit("chat message", {text: userName.value});
//         userName.value = "";
//     }
// })

//Get the message sent from the server and display it on the browser screen.
// socket.on('setUserName', function (userName) {
//     if(!userName) {
//         userName = 'Anonymous👦👧';
//     } else{
//         socket.userName = userName;
//     }
// });

socket.on("chat message", function({msg, userName}){
  chat = document.getElementById("chat");
  chat.insertAdjacentHTML("beforeend", "<li>" + userName + ":" +  msg + "</li>");
});


