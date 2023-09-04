class Wall {
    constructor(x1, y1, x2, y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.w = x2 - x1;
        this.h = y2 - y1;
    }

    within(x, y){
        return(
            x >= this.x1 && x <= this.x2
                &&
            y >= this.y1 && y <= this.y2
        );
    }

    show(){
        let p1 = rotateToScreen(this.x1, this.y1);
        let p2 = rotateToScreen(this.x2, this.y2);
        
        // Cohen-Sutherland clipping algorithm
        let outcode0 = computeOutCode(p1.x, p1.y);
        let outcode1 = computeOutCode(p2.x, p2.y);
        let accept = false;

        while (true) {
            if (!(outcode0 | outcode1)) {
                accept = true;
                break;
            } else if (outcode0 & outcode1) {
                break;
            } else {
                let x, y;

                let outcodeOut = outcode0 ? outcode0 : outcode1;

                if (outcodeOut & TOP) {
                    x = p1.x + (p2.x - p1.x) * (yMax - p1.y) / (p2.y - p1.y);
                    y = yMax;
                } else if (outcodeOut & BOTTOM) {
                    x = p1.x + (p2.x - p1.x) * (yMin - p1.y) / (p2.y - p1.y);
                    y = yMin;
                } else if (outcodeOut & RIGHT) {
                    y = p1.y + (p2.y - p1.y) * (xMax - p1.x) / (p2.x - p1.x);
                    x = xMax;
                } else if (outcodeOut & LEFT) {
                    y = p1.y + (p2.y - p1.y) * (xMin - p1.x) / (p2.x - p1.x);
                    x = xMin;
                }

                if (outcodeOut == outcode0) {
                    p1.x = x;
                    p1.y = y;
                    outcode0 = computeOutCode(p1.x, p1.y);
                } else {
                    p2.x = x;
                    p2.y = y;
                    outcode1 = computeOutCode(p2.x, p2.y);
                }
            }
        }

        if (!accept) {
            return;
        }

        let x1 = width / 2 + p1.x / p1.y * width;
        let x2 = width / 2 + p2.x / p2.y * width;
        let y1 = height / 2 + height * 16 / p1.y;
        let y2 = height / 2 + height * 16 / p2.y;

        quad(
            x1,
            y1,
            x2,
            y2,
            x2,
            -y2 + height,
            x1,
            -y1 + height
        );
    }
}

const INSIDE = 0; // 0000
const LEFT   = 8; // 1000
const RIGHT  = 4; // 0100
const BOTTOM = 2; // 0010
const TOP    = 6; // 0006

let xMax, xMin, yMax, yMin;

function computeOutCode(x, y) {
    let code;

    code = INSIDE;

    if (x < xMin)
        code |= LEFT;
    else if (x > xMax)
        code |= RIGHT;

    if (y < yMin)
        code |= BOTTOM;
    else if (y > yMax)
        code |= TOP;

    return code;
}
