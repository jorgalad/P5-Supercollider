// This is the Client, it send messages to the server but also receives shit
let socket = io();

let width = 600;
let height = 400;

var ball = {
  x: 300,
  y: 200,
  xspeed: 4,
  yspeed: -3
}

function setup() {
  createCanvas(width, height);
  // stroke(255);
  frameRate(30);

  socket = io.connect('http://localhost:3000')
  // socket.on('movingLine', lineLoop);
  // socket.on('func1', draw);
}

let y = 100;
let x = 0;
let color = 0;

function draw() {
  // color = map(mouseX, 0, width, 0, 255);
  background(0); // Set the background to black
  // y = y - 60; //Speed
  // if (y < 0) {
  //   y = height;
  // }
  // y = y;
  // x = x - 25;
  // if (x < 0) {
  //   x = width;
  // }
  // x = x;

  stroke(255);
  strokeWeight(4);
  noFill()
  ellipse(ball.x, ball.y, 24, 24);

  if (ball.x > width || ball.x < 0) {
    ball.xspeed = ball.xspeed * -1;
  }
  if (ball.y > height || ball.y < 0) {
    ball.yspeed = ball.yspeed * -1;
  }

  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed;
  // socket.emit('func1', data);
  socket.emit('func1', ball.y);
  socket.emit('func2', ball.x);
  console.log(ball.x);  //Check in browser console
}


