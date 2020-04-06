let game = document.getElementById('game');
let ctx = game.getContext('2d');
game.setAttribute('width', getComputedStyle(game)['width']);
game.setAttribute('height', getComputedStyle(game)['height']);

let bears = [];
let bullets = [];
let shoot
let score = 0

function drawBox(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size)
}


function Crawler(x, y, color, width, height, src){
    this.x = x;
    this.y = y;
    this.color = color;
    this.src = src;
    this.img = document.createElement("img");
    this.width = width;
    this.height = height;
    this.render = function() {
        if (this.src) {
            this.img.src = this.src
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

function bullet(x, y, color, width, height, src){
    this.x = x;
    this.y = y;
    this.color = color;
    this.src = src;
    this.img = document.createElement("img");
    this.width = width;
    this.height = height;
    this.render = function() {
        if (this.src) {
            this.img.src = this.src
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}



let gun = new Crawler(400, 330, "white", 60, 60, "gun.png");


let Obull = new bullet(gun.x + 50, gun.y - 15, "grey", 20, 20, "bull.png");
 bullets.push(Obull);



function createbears() {
    let bear1 = new Crawler(0, -50, 'black', 80, 80, "bear.gif");
    bears.push(bear1);
    let bear2 = new Crawler(230, -20, 'black', 80, 80, "bear.gif");
    bears.push(bear2);
    let bear3 = new Crawler(450, -60, 'black', 80, 80, "bear.gif");
    bears.push(bear3);
    let bear4 = new Crawler(570, -40, 'black', 80, 80, "bear.gif");
    bears.push(bear4);
    let bear5 = new Crawler(720, -90, 'black', 80, 80, "bear.gif");
    bears.push(bear5);
    
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

createbears();

document.addEventListener('keydown', function(e) {  
    switch (e.keyCode) {
        case (37):
        gun.x -=25;
        Obull.x -=25;
        break;
        case(39):
        gun.x +=25;
        Obull.x +=25;
    } 
});
 

function edges() {
    gun.x = Math.min(Math.max(gun.x,0+2),game.width-60);
    gun.y = Math.min(Math.max(gun.y,0+2),game.height-60);
    Obull.x = Math.min(Math.max(Obull.x,0+50),game.width-10);
    Obull.y = Math.min(Math.max(Obull.y,0-1000),game.height-75);
}

document.addEventListener('keydown', function(e) {   
    if( e.keyCode == 32){
     shoot = setInterval(function() {
         Obull.y = Obull.y - 25
        }, 20)
    }
})

function hitD(bears){
    for(var i = 0; i < bears.length; i++)
        if (Obull.x < bears[i].x + bears[i].width-15
            && Obull.x-15 + Obull.width > bears[i].x
            && Obull.y < bears[i].y + bears[i].height
            && Obull.y + Obull.height > bears[i].y) {
            console.log("hit bear")
            bears[i].y = getRndInteger(-10, -100)
            bears[0].x = getRndInteger(0, 50)
            bears[1].x = getRndInteger(100, 250)
            bears[2].x = getRndInteger(300, 350)
            bears[3].x = getRndInteger(450, 500)
            bears[4].x = getRndInteger(630, 730)
            score = document.getElementById("hide").innerText = score + 1
            
        }
        
}



function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    gun.render();
    Obull.render()
    bears.forEach((bear, i) => {
        bears[i].y++;
        bear.render()
        if(Obull.y <= 0){
            clearInterval(shoot)
            Obull = new bullet(gun.x + 50, gun.y - 15, "grey", 20, 20, "bull.png");
            bullets.push(Obull)
            Obull.render()
        }
        hitD(bears)
        lost(bears)
    })
    edges()
}



function lost(bears){
    for(var i = 0; i < bears.length; i++)
        if(bears[i].y + bears[i].width >= 407) {
            clearInterval(runningGame);
            document.getElementById("hide").innerText = "YOU DIED 💀☠️";
        }
}

let reset =  document.getElementById("reset").addEventListener("click", restGame);
function restGame() {
    location.reload();
}

let start =  document.getElementById("start").addEventListener("click", runGame);
function runGame (){

    runningGame = setInterval(gameLoop, 30);
    document.getElementById("start").removeEventListener("click", runGame);
}


