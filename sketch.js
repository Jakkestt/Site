var x;
var y;
var vx = -10;
var vy = 10;
var width;
var height;
var gravity = 0.5;
var bounceFactor = 0.2;
var radius = 10;
var locked;

balls = [];

function setup() {
    width = 640;
    height = 480;
    createCanvas(width,height);
    frameRate(60);
    x = width/2;
    y = height/2;
}

function draw() {
    background(0);
    fill(0);
    fuck();
    fill(255);
    move();
    ball();
}

function addBall() {
    balls.push ({
        ellipse(x,y,radius*2,radius*2)
    })
}

function move() {
    if (!locked) {
        x += vx;
        y += vy;
    }
    if (y < height) {
        vy += gravity;
    }
    if (y + radius > height) {
        y = height - radius;
        vy *= -bounceFactor;
    }
    if (x + radius > width) {
        x = width - radius;
        vx *= -bounceFactor;
    }
    if (x < radius) {
        x = radius;
        vx *= -bounceFactor;
    }
    if (y < radius) {
        y = radius;
        vy *= - bounceFactor;
    }
}

function fuck() {
    ellipse(mouseX,mouseY,50,50);
    var dist = Math.sqrt((mouseX - x) * (mouseX - x) + (mouseY - y) * (mouseY - y));
    //console.log(dist);
    if (mouseIsPressed) {
        if (dist < radius + 50) {
            locked = true;
            vx = 0;
            vy = 0;
            var lx = x;
            var ly = y;
            x = mouseX;
            y = mouseY;
            vx = x - lx;
            vy = y - ly;
            gravity = 0;
        } else {
            gravity = 0.5;
        }
    } else {
        gravity = 0.5;
        locked = false;
    }
}
