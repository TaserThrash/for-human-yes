
let database, chat = 0, input = "", user = true;

function setup(){
    createCanvas(windowWidth - 10, windowHeight - 60);
    database = firebase.database();
    getChat();
    noStroke();

    let inputElem = createInput('');
    inputElem.input(onInput);
    inputElem.position(width / 2, height - 20);

    let button = createButton('Click me!');
    button.mousePressed(onButtonClick);
}

function draw(){
    background(255);
    noFill();
    stroke(0);
    if(chat != 0){
        let a = 20;
        textSize(16);
        for(let i of chat){
            if(i){
                push();
                stroke("green");
                line(0, a + 2, width, a + 2);
                pop();
                push();
                noStroke();
                if(i.sender){
                    fill("blue");
                }
                else{
                    fill("red");
                }
                text(i.text, width / 2 * (!i.sender), a);
                a += 20;
                pop();
            }
        }
    }

    rect(width / 2, height - 40, 100, 20);
    fill(0);
    text(input, width / 2, height - 20);
}

function getChat() {
    let chatRef = database.ref('chat');
    chatRef.on("value", function (data) {
        chat = data.val();
    })
}

function onInput() {
    push();
    clear();
    stroke("green");
    input = this.value();
    text(input, width / 2, height - 80);
    pop();
}

function message(){
    if(input == "3.141592653"){
        user = false;
        return;
    }
    let temp = chat;
    chat[chat.length] = {
        text: input,
        sender: user
    };

    update(chat);
}

function update(state) {
    database.ref("/").update({
      chat: state
    });
}

function onButtonClick() {
    message();
}
