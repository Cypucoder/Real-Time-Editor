var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require ('socket.io')(server);
var bodyParser = require('body-parser');
var socket;

//This connects to the service that sends and returns live data
io.on('connection', function(socket){
    //Lets the admin know when a user is connected. Only states when a connection is made to the login/landing page.
    console.log('A user connected');    
    
    socket.on('message', (evt) => {
        console.log(evt);
        socket.broadcast.emit('message', evt);
    })
    
    
    //disconnects link to server to prevent too many connections to the server
    socket.on('disconnect', function() {
     //Code inserted in here will run on user disconnect. 
     console.log('A user has disconnected');
        socket.disconnect();
        
    });
    
    

});

server.listen(8201, function(){
    console.log("listening on *:8201");
});

app.use(express.static('files'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.get('/', function(req, res){
        res.sendFile(__dirname + 'files/index.html');
});