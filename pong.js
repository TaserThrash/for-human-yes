
let xS;
let y;
let ball = {};
let G = 0.1;

function setup(){
    createCanvas(windowWidth - 20, windowHeight - 80);

    xS = createSlider(0, width, width / 2, 0);
    xS.style("width", "100%");
    xS.position(-3, height + 10);
    noFill();
    restart();
}

function draw(){
    background(255);
    let x = xS.value();

    push();
    rectMode(CENTER);
    fill("blue");
    rect(x, y, width / 10, height / 60);
    fill("red");
    ellipse(ball.x, ball.y, width / 60)
    pop();

    ball.y += ball.vy;
    ball.vy += G;
    ball.x += ball.vx;
    if(
        abs(ball.x - x) < (width / 10 + width / 70) / 2
            &&
        abs(ball.y - y) < (height / 60 + width / 60) / 2
    ){
        let a = atan2(x - ball.x, y - ball.y);
        ball.vx = abs(sin(a) * 4);
        if(x > ball.x){
            ball.vx *= -1;
        }
        ball.vy = -abs(cos(a)) * 10;
    }

    if(abs(ball.x - width / 2) > width / 2){
        ball.vx *= -1;
    }

    if(ball.y > height * 1.5){
        restart();
    }
}

function restart(){
    y = height * 0.9;
    ball = {
        x: width / 2,
        y: height / 2,
        vx: 4,
        vy: -3
    };
}
