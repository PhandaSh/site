canvas.height = Math.round(innerHeight*6/10);
canvas.width = innerWidth;
var c = canvas.getContext("2d");
var friction = 0.88;
var gravity = 0.8;
var colorArray = [
  "#00ffbc",
  "#c100ff",
  "#ff9500",
  "#1200ff",
  "#ff1c1c",
  "#004081",
  "#ff0087"
  ];
//
function randomIntFromRange(min, max){
  return Math.round(Math.random()*(max-min)+1*min);
}
function randomColor(){
  return colorArray[Math.round(Math.random()*colorArray.length)];
}
function Circle(x, y, radius, color, dx, dy){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.dx = dx;
  this.dy = dy;
  //
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.fill();
  };
  //
  this.update = function(){
    
    //
    if(this.x+this.dx+this.radius>canvas.width || this.x+this.dx-this.radius<0){
      this.dx = -this.dx*friction;
    }
    if(this.y+this.dy+this.radius>canvas.height){
      this.dy = -this.dy*friction;
      this.dx = this.dx*friction;
    }
    else{
      this.dy += gravity;
    }
    //
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
  //
}

var circleArray = [];

for(let i =0; i<50; i++){
  var radius = randomIntFromRange(10,15);
  var color  = randomColor();
  var x = randomIntFromRange(radius+1,canvas.width-radius-1);
  var y = randomIntFromRange(radius+1,canvas.height-radius-1);
  var dx = randomIntFromRange(1,3);
  var dy = randomIntFromRange(-3,2);
  circleArray.push(new Circle(x, y, radius, color, dx, dy));
 }

//
function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i<circleArray.length; i++){
     circleArray[i].update();
  }
}
animate();
//
console.log(`width:${canvas.width},height:${canvas.height}`);