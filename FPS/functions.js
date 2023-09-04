
function drawWalls(){
    for(let i of walls){
        i.show();
    }
}

function rotateToScreen(px, py) {
    let dx = px - x;
    let dy = py - y;
    let rx = dx * Math.sin(d) - dy * Math.cos(d);
    let ry = dx * Math.cos(d) + dy * Math.sin(d);
    return {x: rx, y: -ry};
}
