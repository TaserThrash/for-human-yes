
let numS;

function setup(){
    createCanvas(windowWidth - 5, windowHeight - 60);

    numS = createSlider(4, 32, 5);
    numS.style("width", "80%");
}

function draw(){
    background(255);
    n = numS.value();
    translate(width / 2, height / 2);
    scale(min(width, height) / 4);
    strokeWeight(4 / min(width, height));
    
    let points = [];
    for(let i = 0; i < n; i++){
        points.push({
            x: cos(i * TAU / n),
            y: sin(i * TAU / n)
        });
    }

    for(let i = 0; i < points.length; i++){
        for(let j = 0; j < points.length; j++){
            line(
                points[i].x,
                points[i].y,
                points[j].x,
                points[j].y
            );
        }
    }

    for(let i = 0; i < points.length; i++){
        push();
        stroke(255);
        strokeWeight(4 / min(width, height) * 2);
        j = (i + 1) % points.length;
        line(
            points[i].x,
            points[i].y,
            points[j].x,
            points[j].y
        );
        pop();
    }
}
