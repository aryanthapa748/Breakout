const container = document.querySelector(".container")
const result = document.querySelector('#resultDisplay')

const blockWidth = 100
const blockHeight = 20

const userBlockStartPosition = [230, 10] // to initially set the user block in this position
const currentUserPosition = userBlockStartPosition // since we want to move the block left and right later and we wanna change the position everytime so this is necessary
const ballStartPosition = [270, 40]
const currentBallPosition = ballStartPosition

let xDirection = 2
let yDirection = 2

let boardWidth = 570
let boardHeight = 300
let ballDiameter = 20

let timerId
let score = 0

// since we have to make 15 of the different blocks with different values for left and bottom we are going to create a class
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
  }
}

// and then creating new instances of the class by passing different values but also putting them in an array so that we can easily access it using [] bracket notation
const blocksArrayInstances = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),

  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),

  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
]

// function to create block's
function createBlock() {
  for (let i = 0; i < blocksArrayInstances.length; i++) {
    const createBlock = document.createElement("div")
    createBlock.classList.add("block")
    createBlock.style.left = blocksArrayInstances[i].bottomLeft[0] + "px"
    createBlock.style.bottom = blocksArrayInstances[i].bottomLeft[1] + "px"
    container.appendChild(createBlock)
  }
}

createBlock()

// function to create user block
const user = document.createElement("div")
user.classList.add("user")
/* user.style.left = currentPosition[0] + "px"     // essentially just to DRY i made this two lines of code to a new function called drawUserBlock so that we can uise this function many times later in the code
user.style.bottom = currentPosition[1] + "px" */
drawUserBlock()
container.appendChild(user)

function drawUserBlock() {
  user.style.left = currentUserPosition[0] + "px" // so we are accessing the values from the variables that we have set in the top
  user.style.bottom = currentUserPosition[1] + "px" // same for this
}

//function to move the user block left and right
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentUserPosition[0] > 10) {
        // to prevent userBlock from breaking out the container we enclosed this in a=if statement
        currentUserPosition[0] -= 15
        drawUserBlock()
      }
      break

    case "ArrowRight":
      if (currentUserPosition[0] < 450) {
        currentUserPosition[0] += 15
        drawUserBlock()
      }
      break
  }
}

document.addEventListener("keydown", moveUser) // without this the above function to move the user block left and right wont essentially work.

//create ball
const ball = document.createElement("div")
ball.classList.add("ball")
/* ball.style.left = currentBallPosition[0] + 'px';
ball.style.bottom = currentBallPosition[1] + 'px' */
drawBall()
container.appendChild(ball)

// same as for user DRY
function drawBall() {
  ball.style.left = currentBallPosition[0] + "px"
  ball.style.bottom = currentBallPosition[1] + "px"
}

//function to move ball
function moveBall(){ 
    currentBallPosition[0] += xDirection
    currentBallPosition[1] += yDirection
    drawBall()
    checkCollisions()
}

timerId = setInterval(moveBall, 30); // run the moveball every 30ms if we dont run this then we wouldn't have been have the moving effect and we are settinf the timerId varibale because we need to stop the setInterval at some point of code

// function to check for collisions
function checkCollisions(){
    //check for ball collisions
    for (let i = 0; i < blocksArrayInstances.length; i++){
        if(
            (currentBallPosition[0] > blocksArrayInstances[i].bottomLeft[0] && currentBallPosition[0] < blocksArrayInstances[i].bottomRight[0]) &&
            ((currentBallPosition[1] + ballDiameter) > blocksArrayInstances[i].bottomLeft[1] && currentBallPosition[1] < blocksArrayInstances[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block')) // to remove the block that we just hit from ball
            allBlocks[i].classList.remove('block');
            blocksArrayInstances.splice(i, 1);
            changeDirection();
            score++;
            result.innerHTML = score

            // check for win
            if (blocksArrayInstances.length === 0){
                result.innerHTML = 'YOU WIN!'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }
        }
    }

    //check for userBlock collisions
    if(
        (currentBallPosition[0] > currentUserPosition[0] && currentBallPosition[0] < currentUserPosition[0] + blockWidth) &&
        (currentBallPosition[1] > currentUserPosition[1] && currentBallPosition[1] <currentUserPosition[1] + blockHeight)
    ){
        changeDirection();
    }

    // this is for checking wall collisions
    if(currentBallPosition[0] > (boardWidth - ballDiameter) ||
       currentBallPosition[1] > (boardHeight - ballDiameter) ||
       currentBallPosition[0] <= 0){
        changeDirection()
    }

    //check for game over
    if(currentBallPosition[1] <= 0){
        clearInterval(timerId)
        result.innerHTML = 'You loose!'
        document.removeEventListener('keydown', moveUser);
    }
}


// function to change the direction of the ball after the collision
function changeDirection(){
    if (xDirection === 2 && yDirection === 2){
        yDirection =- 2
        return
    }
    if (xDirection === 2 && yDirection === -2){
        xDirection =- 2
        return
    }
    if (xDirection === -2 && yDirection === -2){
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2){
        xDirection = 2
        return
    }
}
