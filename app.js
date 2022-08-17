var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Get message sent from front side.
io.on("connection", function(socket){
    console.log("User connected");
    socket.on("disconnect", function(){
        console.log("User Disconnected");
    });

    socket.on("chat message", function({msg, userName, room}){
        console.log("Message: " + msg + ", user: " + userName + ", room: " + room);
        io.emit("chat message", {msg, userName, room})
    })
})

module.exports = {
    app: app,
    server: server,
}
