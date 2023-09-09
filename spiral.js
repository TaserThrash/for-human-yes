
let sliders = {};
let t = 0;

function setup(){
    createCanvas(windowWidth - 5, windowHeight - 90);
    sliders = {
        a: createSlider(1, 50, 5, 0),
        weight: createSlider(0.5, 10, 1, 0),
        rotate: createSlider(0, PI / 2, 0.1, 0)
    };
}

function draw(){
    v = {
        a: sliders.a.value(),
        weight: sliders.weight.value(),
        rotate: sliders.rotate.value()
    };

    t += v.rotate;

    push();
    translate(width / 2, height / 2);
    rotate(t);
    background(255);

    let i = 0;
    while(i * v.a < max(width, height) / 2 * 2 ** 0.5){
        strokeWeight(v.weight);
        stroke(sin(i) * 255, t * i % 255, i ** 2 % 255);
        let p1 = {
            x: cos(i) * v.a * i,
            y: sin(i) * v.a * i,
        }

        i += 0.1;

        let p2 = {
            x: cos(i) * v.a * i,
            y: sin(i) * v.a * i,
        }

        line(p1.x, p1.y, p2.x, p2.y);
    }

    pop();
}
