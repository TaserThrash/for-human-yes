
let sliders = {};
let t = 0;
let img;

function setup(){
    createCanvas(windowWidth - 5, windowHeight - 60);
    sliders = {
        wavelength: createSlider(0, 20, 12, 0),
        precision: createSlider(1, 16, 8, 1),
        frequency: createSlider(0, 16, 2, 0),
        framerate: createSlider(4, 64, 16, 1),
        strength: createSlider(0, 24, 4, 0)
    };

    img = createGraphics(width, height);
}

function draw(){
    let v = {
        wavelength: sliders.wavelength.value(),
        precision: sliders.precision.value(),
        frequency: sliders.frequency.value(),
        framerate: sliders.framerate.value(),
        strength: sliders.strength.value()
    };
    
    if(frameCount % (65 - v.framerate) == 0){
        background(0);
        img.background(0);
        img.push();
        img.translate(width / 2, height / 2);
        for(let x = 0; x < width / 2; x += v.precision){
            for(let y = -height / 2; y < height / 2; y += v.precision){
                let z = sin(((x ** 2 + y ** 2) ** 0.5) * TAU / (101 - v.wavelength) + t) * v.strength;

                img.fill(x % 255, y % 255, z / v.strength * 255);

                img.rect(x, y - z, v.precision, v.precision);
                img.rect(-x, y - z, v.precision, v.precision);
            }
        }
        img.pop();

        t += (TAU / 16) * v.frequency;

        image(img, 0, 0);
    }
}
