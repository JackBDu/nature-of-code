function setup() {
  createCanvas(displayWidth, displayHeight);
  ball = new Ball(displayWidth/16, createVector(random(displayWidth/16,displayWidth*15/16), random(displayWidth/16,displayHeight-displayWidth/16)), createVector(0,0), 0.6, color(50, 50, 50));
  frameRate(30);
}

function draw() {
  background(240);
  fill(220);
  textAlign(CENTER);
  textSize(displayWidth/50);
  textStyle(BOLD);
  text("Please open this page on a device with gyroscope enabled.", displayWidth/2, displayHeight/2);
  ball.update(check_collision(ball));
  ball.display();
}

function check_collision(b) {
  if (radians(rotationX) > HALF_PI) {
    var a_x = -radians(rotationY);
    var a_y = PI - radians(rotationX);
  } else if (radians(rotationX) < -HALF_PI) {
    var a_x = -radians(rotationY);
    var a_y = -PI - radians(rotationX);
  } else {
    var a_x = radians(rotationY);
    var a_y = radians(rotationX);
  }
  // collision with left and right
  if ((b.v.x < 0 && b.p.x <= b.r) || (b.v.x > 0 && b.p.x >= displayWidth - b.r)) {
    b.v.x *= -b.e;
  }
  // no acceleration when the ball sits on the edge
  if ((b.p.x <= b.r && a_x < 0) || (b.p.x >= displayWidth - b.r && a_x > 0)) {
    a_x = 0;
  }
  // collision with top and bottom
  if ((b.v.y < 0 && b.p.y <= b.r) || (b.v.y > 0 && b.p.y >= displayHeight - b.r)) {
    b.v.y *= -b.e;
  }
  // no acceleration when the ball sits on the edge
  if ((b.p.y <= b.r && a_y < 0) || (b.p.y >= displayHeight - b.r && a_y > 0)) {
    a_y = 0;
  }
  return createVector(a_x, a_y);
}

function Ball(radius, init_pos, velocity, elasticity, color) {

  this.r = radius;
  this.p = init_pos;
  this.v = velocity;
  this.e = elasticity;
  this.c = color;

  this.update = function(a) {
    this.v.add(a);
    this.p.add(this.v);
  }
  
  this.display = function() {
    fill(this.c);
    noStroke();
    ellipse(this.p.x, this.p.y, this.r * 2, this.r * 2);
  }
}
