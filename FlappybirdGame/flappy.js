// board 

let board;
let boardWidth = 350;
let boardHeight = 600;
let context;

//bird 
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth/9;
let birdY = boardHeight/2 ;
let birdImage;

let bird = {
    y: birdY,
    x: birdX,
    width: birdWidth,
    height: birdHeight
}

// pipe 

let pipeArray =[];
let pipeWidth = 64; 
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;


// pipe image
let topPipeImage;
let botPipeImage;

// Game physics 
let velocityX = -2 // moving pipes to left speed // 2 ito
let velocityY = 0 // for bird jumping 
let gravity = 0.4; // .4 ito

let gameOver = false;
let score = 0;

window.onload = () => {
    board = document.querySelector('#board')
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // used for drawing 

    // load bird image 
    birdImage = new Image();
    birdImage.src = 'PngItem_1842460.png';
    birdImage.onload = () => {
        context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
    }

    // load pipe image 
    topPipeImage = new Image();
    topPipeImage.src = 'toppipe.png';

    botPipeImage = new Image();
    botPipeImage.src = 'bottompipe.png';


    requestAnimationFrame(update);
    setInterval(placePipes, 1500); //

    document.addEventListener('keydown', moveBird)

    
}



function update () {
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    // bird 
    velocityY += gravity;
    // bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0)
    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
    
    if (bird.y > board.height){
        gameOver = true;
    }
    // pipes loops 
    for(let i = 0; i < pipeArray.length; i++ ){
        let pipe = pipeArray[i];
        pipe.x += velocityX
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if(!pipe.passed && bird.x > pipe.x + pipe.width){
            score += 0.5; // bc you wil passed to pipe that is = to 1
            pipe.passed = true; 
        }



        if(detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    // clear pipes 
    while(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
        pipeArray.shift(); // Remove the 1st element from the array 
    }

    // SCORE 
    context.fillStyle = 'white';
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45)

    if(gameOver){
        context.fillText("GAME OVER", 7, 85)
    }
}

function placePipes () {
    if(gameOver){
        return;
    }
    //(0.1) * pipeHeight/2
    // 0 -> -128(pipeHeight/4)
    //1 -> -128 -256 (pipeHeight/4 - pipeheight/2)

    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight/2);
    let openingSpace = board.height / 4;

    let topPipe = {
        img: topPipeImage,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };

    pipeArray.push(topPipe);

    let bottomPipe = {
        img: botPipeImage,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };
    pipeArray.push(bottomPipe);
}

function moveBird (e) {
    if(e.code == 'Space' || e.code == 'ArrowUp' || e.code =='KeyX'){
        velocityY = -6;
    }

    // reset
    if(gameOver){
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        gameOver = false;
    }
}

function detectCollision(a, b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

