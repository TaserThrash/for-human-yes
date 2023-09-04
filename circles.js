
let numS;

function setup(){
    createCanvas(windowWidth - 5, windowHeight - 60);

    numS = createSlider(2, 100, 10, 0);
    numS.style("width", "80%");
    noFill();
}

function draw(){
    background(255);
    let n = numS.value();
    let s = max(width, height);

    for(let i = 0; i < s * 2; i += s / 100 * (n / 2)){
        stroke("red");
        ellipse(width / 2, height / 2, i);
        stroke("blue");
        ellipse(0, 0, i);
        stroke("green");
        ellipse(width, height, i);
        stroke("magenta");
        ellipse(width, 0, i);
        stroke("orange");
        ellipse(0, height, i);
    }
}
