
let sliders = {};
let v, pv;

function setup(){
    createCanvas(windowWidth - 5, windowHeight - 90);
    sliders = {
        len: createSlider(5, 100, 80, 0),
        percentMin: createSlider(1, 80, 55, 0),
        percentMax: createSlider(1, 80, 55, 0),
        minA: createSlider(0, 90, 30, 0),
        maxA: createSlider(0, 90, 40, 0),
        stop: createSlider(5, 10, 5, 0),
        leafS: createSlider(0, 20, 5, 0)
    };

    mousePressed();
}

function branch(l){
    l *= random(v.percentMin, v.percentMax) / 100;
    if(l < v.stop){
        leaf();
        return;
    }
    push();
    line(0, 0, 0, -l);
    translate(0, -l);
    push();
    rotate(random(v.minA, v.maxA) * PI / 180);
    branch(l);
    pop();
    push();
    rotate(-random(v.minA, v.maxA) * PI / 180);
    branch(l);
    pop();
    pop();
}

function leaf(){
    push();
    noStroke();
    yellow = [255, 255, 0];
    color = [random(0, 255), random(0, 255), 0];
    avg = [
        (yellow[0] + color[0]) / 2,
        (yellow[1] + color[1]) / 2,
        (yellow[2] + color[2]) / 2,
    ];

    fill(avg);
    rotate(random(0, TAU));
    ellipse(0, 0, v.leafS);
    pop();
}

function mousePressed(){
    push();
    v = {
        len: sliders.len.value(),
        percentMin: sliders.percentMin.value(),
        percentMax: sliders.percentMax.value(),
        minA: sliders.minA.value(),
        maxA: sliders.maxA.value(),
        stop: sliders.stop.value(),
        leafS: sliders.leafS.value()
    };

    background(255);
    translate(width / 2, height / 2);
    branch(v.len);
    pop();
}
