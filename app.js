var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dandelionRouter = require('./routes/dandelion');

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
app.use('/dandelion', dandelionRouter);

//Get message sent from front side.
io.on("connection", function(socket){
    console.log("User connected");
    socket.on("disconnect", function(){
        console.log("User Disconnected");
    });

    socket.on("chat message", function({msg, userName}){
        console.log("Message: " + msg + ", user: " + userName)
        io.emit("chat message", {msg, userName})
    })
})

module.exports = {
    app: app,
    server: server,
}
