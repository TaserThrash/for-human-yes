
let sliders = {};
let v;

function setup(){
    createCanvas(windowWidth - 5, windowHeight - 90);
    sliders = {
        size: createSlider(0, 1, 0.9, 0),
        num: createSlider(1, 100, 8, 1)
    };

    sliders.num.style('width', "80%");
}

function draw(){
    background(255);
    push();
    v = {
        size: sliders.size.value(),
        num: sliders.num.value()
    };

    s = min(width, height);

    translate(width / 2, height / 2);
    noFill();
    for(let i = 0; i < TAU; i += TAU / v.num){
        ellipse(
            sin(i) * s / 4 * v.size,
            -cos(i) * s / 4 * v.size,
            s * v.size / 2
        );
    }

    pop();
}
