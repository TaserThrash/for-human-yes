
let x = 10;
let y = 10;
let d = 0;
let grid = [];
let win = false;
let sliders = {};
let v;
let button;
let mobile = true;

function setup(){
    createCanvas(windowWidth - 4, windowHeight - 60);
    rectMode(CENTER);
    noStroke();

    let grids = [[
        "####################",
        "#P#    #           #",
        "# # #### #### #### #",
        "#        #  # #    #",
        "##### ####  # #  ###",
        "#        #    #    #",
        "# ################ #",
        "# #  #             #",
        "# ## # ######### ###",
        "#    #       #   # #",
        "###### ##### # # # #",
        "#    #     # #   # #",
        "#  # #  #  ####### #",
        "#  #    #  #   #   #",
        "#  # #       #   # #",
        "#    #### ###### # #",
        "#  #    #      # # #",
        "#  ### ####### #####",
        "#            #      ",
        "##################  "
    ],
    [
        "##################  ",
        "#P    #     #       ",
        "### #### #### #### #",
        "#        #  # #    #",
        "##### ####  # #  ###",
        "#        #    #    #",
        "# ################ #",
        "# #  #             #",
        "# ## # ######### ###",
        "#            #   # #",
        "###### ##### # # # #",
        "#    #     # #   # #",
        "#  # #  #  ####### #",
        "#  #    #  #   #   #",
        "#  # #       #   # #",
        "#    #### ###### # #",
        "#  #    #      # # #",
        "#  ### ####### #####",
        "#            #     #",
        "####################"
    ],
    ];

    grid = grids[int(random(0, grids.length))];
    frameRate(60);

    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[0].length; j++){
            if(grid[i][j] == "P"){
                y = i;
                x = j;
                grid[i][j] = " ";
            }
        }
    }

    sliders = {
        fov: createSlider(40, 90, 60, 0),
        res: createSlider(64, 512, 128, 0),
        step: createSlider(0.01, 1, 0.125, 0),
        fps: createSlider(10, 144, 60)
    };

    sliders.fov.style("width", "10%");
    sliders.res.style("width", "10%");
    sliders.step.style("width", "40%");
    sliders.fps.style("width", "10%");

    button = createButton("TOGGLE INPUT MODE");
    button.mouseClicked(() => {
        mobile = !mobile;
    });
    button.size(width * 0.1, height * 0.072);

    //left
    createMobileButton(0.1, 0.8, 0.05, 0.05, "red", () => {
        x -= cos(d + PI / 2) / 20;
        y -= sin(d + PI / 2) / 20;
    }, "hold");
    //bottom
    createMobileButton(0.15, 0.85, 0.05, 0.05, "red", () => {
        x -= cos(d) / 20;
        y -= sin(d) / 20;
    }, "hold");
    //up
    createMobileButton(0.15, 0.75, 0.05, 0.05, "red", () => {
        x += cos(d) / 20;
        y += sin(d) / 20;
    }, "hold");
    //right
    createMobileButton(0.2, 0.8, 0.05, 0.05, "red", () => {
        x += cos(d + PI / 2) / 20;
        y += sin(d + PI / 2) / 20;
    }, "hold");

    //turnRight
    createMobileButton(0.85, 0.8, 0.05, 0.05, "red", () => {
        d += 0.02;
    }, "hold");

    //turnLeft
    createMobileButton(0.8, 0.8, 0.05, 0.05, "orange", () => {
        d -= 0.02;
    }, "hold");
}

function draw(){
    v = {
        fov: sliders.fov.value(),
        res: sliders.res.value(),
        step: sliders.step.value()
    };

    frameRate(sliders.fps.value());

    background(255);

    let px = x;
    let py = y;

    if(keyIsDown(UP_ARROW) || keyIsDown(87)){
        x += cos(d) / 20;
        y += sin(d) / 20;
    }

    if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
        x -= cos(d) / 20;
        y -= sin(d) / 20;
    }

    if(keyIsDown(68)){
        x += cos(d + PI / 2) / 20;
        y += sin(d + PI / 2) / 20;
    }

    if(keyIsDown(65)){
        x -= cos(d + PI / 2) / 20;
        y -= sin(d + PI / 2) / 20;
    }

    if(keyIsDown(RIGHT_ARROW)){
        d += 0.02;
    }

    if(keyIsDown(LEFT_ARROW)){
        d -= 0.02;
    }

    if(mobile){
        handleHoldButtons();
    }

    if(!grid[int(y)] || !grid[int(y)][int(x)]){
        x = px;
        y = py;
        win = true;
    }

    if(grid[int(y)][int(x)] == "#"){
        if(grid[int(py)][int(x)] != "#" && grid[int(y)][int(px)] == "#"){
            y = py;
        }
        else if(grid[int(y)][int(px)] != "#" && grid[int(py)][int(x)] == "#"){
            x = px;
        }
        else{
            x = px;
            y = py;
        }
    }

    let res = v.res;
    let fov = v.fov;
    for(let i = -fov / 2; i < fov / 2; i += fov / res){
        let p = raycast(x, y, d + i * PI / 180);
        if(!p){
            continue;
        }

        let distance = dist(x, y, p.x, p.y);
        distance *= cos(i * PI / 180);
        
        fill(abs(0.5 - yes(p.x)) * 255, abs(0.5 - yes(p.y)) * 255, 255);

        rect(width / 2 + i * (width / fov), height / 2, ceil(width / res), height * 2 / distance);
    }

    text(getFrameRate(), 20, 20);
    if(win){
        fill("green");
        text("VICTORY", width / 2, height / 2);
    }

    if(mobile){
        drawButtons();
    }
}


function raycast(x, y, d){
    let wallSide;
    let r = {x: x, y: y};
    prevR = r;
    
    while(grid[int(r.y)][int(r.x)] != "#"){
        prevR = {x: r.x, y: r.y};
        
        r.x += cos(d) * v.step;
        r.y += sin(d) * v.step;

        if(!grid[int(r.y)] || !grid[int(r.y)][int(r.x)]){
            r = null;
            break;
        }
    }

    if(r == null){
        return null;
    }

    if (r != null) {
        // Calculate which side of the wall cell was crossed
        let cellX = int(r.x);
        let cellY = int(r.y);
        if (prevR.y < cellY && r.y >= cellY) {
            wallSide = "top";
        } else if (prevR.y > cellY+1 && r.y <= cellY+1) {
            wallSide = "bottom";
        } else if (prevR.x < cellX && r.x >= cellX) {
            wallSide = "left";
        } else if (prevR.x > cellX+1 && r.x <= cellX+1) {
            wallSide = "right";
        }
    }

    dy = wallSide == "top" ? yes(r.y) : -(1 - yes(r.y));
    dx = wallSide == "left" ? yes(r.x) : -(1 - yes(r.x));

    if(wallSide == "top" || wallSide == "bottom"){
        r.y -= dy;
        r.x -= cos(d) * dy / sin(d);
    }
    if(wallSide == "left" || wallSide == "right"){
        r.x -= dx;
        r.y -= sin(d) * dx / cos(d);
    }    

    return {x: r ? r.x : null, y: r ? r.y : null, side: wallSide};
}

function yes(x){
    return x - int(x);
}
