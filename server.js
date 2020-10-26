
//Import Express and set to variable (which is also a function call)
var express = require('express');
// Create the App
var app = express();
var osc = require("osc");


// Listen to port 3000
var server = app.listen(3000);

// Use the public folder 
app.use(express.static('public'));
console.log('My socket server is running');

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

//This function gets triggered when there's a new socket connection from the client
function newConnection(socket) {
    console.log('new connection' + socket.id);
    //If there's a message called 'mouse', trigger the mouseMsg function
    socket.on('mouse', mouseMsg )
    function mouseMsg(data) {
        //broadcast.emit sends the message back out
        socket.broadcast.emit('mouse', data);
        
        // udpPort.send(msg);
        udpPort.send({ address: "/SC/syn2/freq", args: [{type: "f",value: data.x },]});
        udpPort.send({ address: "/SC/syn2/cutoff", args: [{type: "f",value: data.y },]});

        // udpPort.send({ address: "/SC/syn1/freq", args: [{type: "f",value: data.y },]});
        // udpPort.send({ address: "/SC/syn1/freq", args: [{'mouse': data },]});
        

        //The io.sockets refers to everything, so it will also send the message back to the sender
        // io.sockets.emit('mouse', data);
        console.log(data);
    }
}


var udpPort = new osc.UDPPort({
    // This is the port we're listening on.
    localAddress: "127.0.0.1",
    localPort: 57121,

    // This is where sclang is listening for OSC messages.
    remoteAddress: "127.0.0.1",
    remotePort: 57120,
    metadata: true
});

udpPort.open();

