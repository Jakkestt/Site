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
    stroke(255);
    x = width/2;
    y = height/2;
    addBall();
    addBall();
}

function addBall() {
    balls.push ({
        id: balls.length,
        x: Math.floor(Math.random() * width) + 0,
        y: Math.floor(Math.random() * height) + 0,

        radius: radius,

        vx: vx,
        vy: vy,

        lx: 0,
        ly: 0,

        locked: false,
    })
    console.log("Fuck");
}

function move(ball) {
    if (!locked) {
        ball.x += ball.vx;
        ball.y += ball.vy;
    }
    if (ball.y < height) {
        ball.vy += gravity;
    }
    if (ball.y + radius > height) {
        ball.y = height - ball.radius;
        vy *= -bounceFactor;
    }
    if (ball.x + ball.radius > width) {
        ball.x = width - ball.radius;
        ball.vx *= -bounceFactor;
    }
    if (ball.x < ball.radius) {
        ball.x = ball.radius;
        ball.vx *= -bounceFactor;
    }
    if (ball.y < ball.radius) {
        ball.y = ball.radius;
        ball.vy *= -bounceFactor;
    }
}

function fuck(ball) {
    var dist = Math.sqrt((mouseX - ball.x) * (mouseX - ball.x) + (mouseY - ball.y) * (mouseY - ball.y));
    //console.log(dist);
    if (mouseIsPressed) {
        if (dist < ball.radius * 2) {
            locked = true;
            ball.vx = 0;
            ball.vy = 0;
            ball.lx = ball.x;
            ball.ly = ball.y;
            ball.x = mouseX;
            ball.y = mouseY;
            ball.vx = ball.x - ball.lx;
            ball.vy = ball.y - ball.ly;
            gravity = 0;
        } else {
            gravity = 0.5;
        }
    } else {
        gravity = 0.5;
        locked = false;
    }
}

function makeBall(ball) {
    ellipse(ball.x,ball.y,ball.radius*2,ball.radius*2);
}

function draw() {
    background(0);
    balls.map(ball => makeBall(ball));
    balls.map(ball => fuck(ball));
    balls.map(ball => move(ball));
}
