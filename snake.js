const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class snakePart{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
}

let partSize = 20;
let width = canvas.width;
let height = canvas.height;
let speed = 15;

// initialize
let headX = 100;
let headY = 300;
const snake=[];
let dx = 0;
let dy = 0;
let appleX = 200;
let appleY = 240;
let score = 0;

function drawRect(x, y, color1, color2, w, h)
{
    ctx.fillStyle = color1;
    ctx.strokestyle = color2;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h)
}

function drawText(text, x, y)
{
    ctx.fillStyle = 'black';
    ctx.font = '20px Georgia';
    ctx.fillText(text, x, y);
}

// main function for playing the game
function makeGame()
{
    let stat = gameOver();
    if(stat)
    {
        return;
    }
    drawBoard();
    drawSnake();
    drawApple();
    
    setTimeout(makeGame, 1000/speed);
}

function drawBoard()
{
    drawRect(0, 0, 'white', 'black', width, height);
}

function drawSnake()
{
    let needApple = collision();

    // move snake head
    headX += dx;
    headY += dy;
    snake.unshift(new snakePart(headX, headY));

    // draws body of snake
    for(let i = 0; i < snake.length; i++)
    {
        let bit = snake[i];
        drawRect(bit.x, bit.y, 'green', 'black', partSize, partSize);
    }
    
    if(needApple == 2)
    {
        // do not need to pop tail if eats apple
        newApple();
    }
    else 
    {
        // incrementally moves snake's tail
        snake.pop();
    }
}

function drawApple()
{
    drawRect(appleX, appleY, 'red', 'black', partSize, partSize);
    drawText('Score: '+score, 25, 25);
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event)
{
    let key = event.keyCode;

    // go left
    if(key == 37 && dx != 20)
    {
        dx = -20;
        dy = 0;
    }
    // go right
    if(key == 39 && dx != -20)
    {
        dx = 20;
        dy = 0;
    }
    // go up
    if(key == 38 && dy != 20)
    {
        dx = 0;
        dy = -20;
    }
    // go down
    if(key == 40 && dy != -20)
    {
        dx = 0;
        dy = 20;
    }
}

function gameOver()
{
    let stat = 0;

    // check if snake hits edge of canvas
    if(headX<0)
    {
        stat = 1;
    }
    else if(headX==width)
    {
        stat = 1;
    }
    else if(headY<0)
    {
        stat = 1;
    }
    else if(headY==width)
    {
        stat = 1;
    }
    else if(collision()==1)
    {
        stat = 1;
    }

    if(stat)
    {
        drawText('Game Over', 25, 375);
    }
    
    return stat;
}

function collision()
{
    // if snake eats apple
    if(appleX == headX && appleY == headY)
    {
        return 2;
    }
    // if snake hits self
    for(let i=1; i<snake.length;i++)
    {
        let bit = snake[i];
        if(bit.x == headX && bit.y == headY)
        {
            return 1;
        }
    }
    return 0;
}

function newApple()
{
    // create a new apple at coordinates in multiples of 20
    appleX = 20 * Math.floor(Math.random()*(width/20));
    appleY = 20 * Math.floor(Math.random()*(height/20));
    score++;
}

makeGame();
