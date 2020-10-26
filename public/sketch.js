// This is the Client, it send messages to the server but also receives shit
var socket = io();

function setup() {
  createCanvas(600, 400);
  stroke(255);
  frameRate(30);

  socket = io.connect('http://localhost:3000')
  // socket.on('movingLine', lineLoop);
  // socket.on('func1', draw);
}

let y = 100;
let x = 0;

function draw() {
  background(0); // Set the background to black
  y = y - 10; //Speed
  if (y < 0) {
    y = height;
  }

  y = y;

  x = x - 25;
  if (x < 0) {
    x = width;
  }
  x = x;

  line(x, y, width, y);

  // socket.emit('func1', data);
  socket.emit('func1', y);
  socket.emit('func2', x);
  console.log('X =', x);  //Check in browser console
}


// function mouseDragged() {
//   // This is what gets send (JS Object)
//   var data = {
//     x: mouseX,
//     y: mouseY
//   }

  // socket.emit('func1', data);

  // var data = { x: y };
  // socket.emit('func1', line + random(-1, 1));

// }
  // var data = {
  //   y: y + random(-1, 1)
  // }

  //Now send it


  // noStroke();
  // fill(255);
  // ellipse(mouseX, mouseY, 12, 12);




