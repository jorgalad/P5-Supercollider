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
}

let y = 100;
let x = 0;
let color = 0;

function draw() {
  background(0);
  move()
  bounce()
  display()
  sendData()
}

function move() {
  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed;
}

function bounce() {
  if (ball.x > width || ball.x < 0) {
    ball.xspeed = ball.xspeed * -1;
  }
  if (ball.y > height || ball.y < 0) {
    ball.yspeed = ball.yspeed * -1;
  }
}
function display() {
  stroke(255);
  strokeWeight(4);
  noFill()
  ellipse(ball.x, ball.y, 24, 24);
}

function sendData() {
  socket.emit('func1', ball.y);
  socket.emit('func2', ball.x);
  console.log(ball.x);  //Check in browser console
}