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
    const dist = Math.sqrt((mouseX - ball.x) * (mouseX - ball.x) + (mouseY - ball.y) * (mouseY - ball.y));
    //console.log(dist);
    if (dist < ball.radius * 2) {
        if (mouseIsPressed) {
            ball.locked = true;
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
        ball.locked = false;
    }

    for (i = 0; i < balls.length; i++) {
        for (j = i + 1; j < balls.length; j++) {
            first = balls[i];
            second = balls[j];
            const distBall = Math.sqrt((second.x - first.x) * (second.x - first.x) + (second.y - first.y) * (second.y - first.y));
            if (distBall < ball.radius * 2) {
                const newVelX1 = (first.vx * (first.radius - second.radius) + (2 * second.radius * second.vx) / (first.radius + second.radius));
                const newVelY1 = (first.vy * (first.radius - second.radius) + (2 * second.radius * second.vy) / (first.radius + second.radius));
                const newVelX2 = (second.vx * (second.radius - first.radius) + (2 * first.radius * first.vx) / (first.radius + second.radius));
                const newVelY2 = (second.vy * (second.radius - first.radius) + (2 * first.radius * first.vy) / (first.radius + second.radius));
                first.x = first.x;
                first.y = first.y;
                second.x = second.x;
                second.y = second.y;
                first.vx = newVelX1;
                first.vy = newVelY1;
                second.vx = newVelX2;
                second.vy = newVelY2;
            }
        }
    }
}

function makeBall(ball) {
    ellipse(ball.x,ball.y,ball.radius*2,ball.radius*2);
    text(ball.id,ball.x-4,ball.y+4);
}

function draw() {
    background(0);
    balls.map(ball => move(ball));
    balls.map(ball => fuck(ball));
    balls.map(ball => makeBall(ball));
}
