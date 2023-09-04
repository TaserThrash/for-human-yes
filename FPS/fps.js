
let x = 200;
let y = 200;
let d = 0;
let walls = [];
let enemies = [];

function setup(){
    createCanvas(windowWidth - 4, windowHeight - 4);
    rectMode(CENTER);

    walls = [
        new Wall(-10, -10, 410, 0),
        new Wall(400, -10, 410, 410),
        new Wall(-10, 400, 400, 410),
        new Wall(-10, 0, 0, 400)
    ];    

    enemies = [new Enemy()];
}

function draw(){
    background(255);

    if(keyIsDown(UP_ARROW)){
        x += cos(d);
        y += sin(d);
    }

    if(keyIsDown(DOWN_ARROW)){
        x -= cos(d);
        y -= sin(d);
    }

    if(keyIsDown(RIGHT_ARROW)){
        d -= 0.005;
    }

    if(keyIsDown(LEFT_ARROW)){
        d += 0.005;
    }

    ellipse(x, y, 5);

    drawWalls();
    
    for(let i of enemies){
        ellipse(i.x, i.y, 5)
        i.show();
    }
}
