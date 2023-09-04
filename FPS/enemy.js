class Enemy {
    constructor(){
        this.x = random(0, 400);
        this.y = random(0, 400);
    }

    show(){
        let pos = rotateToScreen(this.x, this.y);
        let x = pos.x / pos.y * width;
        
        if(pos.y < 0){
            return;
        }

        rect(x + width / 2, height / 2, 20, 20);
    }
}