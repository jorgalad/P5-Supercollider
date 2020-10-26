
//Import Express and set to variable (which is also a function call)
var express = require('express');
// Create the App
var app = express();
var osc = require("osc");


// Listen to port 3000
var server = app.listen(3000);

// Use the public folder 
app.use(express.static('public'));
console.log('============ Server Running ============');

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

//This function gets triggered when there's a new socket connection from the client
function newConnection(socket) {
    console.log('new connection' + socket.id);
    //If there's a message called 'mouse', trigger the mouseMsg function
    socket.on('func1', funcY)
    socket.on('func2', funcX)
    // console.log("stage 1");
    function funcY(y_axis) {
        // console.log("Function Triggered");
        //broadcast.emit sends the message back out //Not necesarry for SC
        // socket.broadcast.emit('func1', y_axis);
        // udpPort.send(msg);
        udpPort.send({ address: "/SC/syn2/freq", args: [{ type: "f", value: y_axis },] });
        // udpPort.send({ address: "/SC/syn2/cutoff", args: [{ type: "f", value: data },] });
        console.log(y_axis);
    }

    function funcX(x_axis) {
        // socket.broadcast.emit('func1', x_axis);
        udpPort.send({ address: "/SC/syn2/cutoff", args: [{ type: "f", value: x_axis },] });
        console.log(x_axis);
    }
}


var udpPort = new osc.UDPPort({
    // This is the port we're listening on.
    localAddress: "127.0.0.1",
    localPort: 57122,

    // This is where sclang is listening for OSC messages.
    remoteAddress: "127.0.0.1",
    remotePort: 57120,
    metadata: true
});

udpPort.open();

