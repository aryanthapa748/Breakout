const container = document.querySelector('.container');

const blockWidth = 100;
const blockHeight = 20;


// sicne we have to make 15 of the different blocks with different values for left and bottom we are going to create a class
class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
} 

// and then creating new instances of the class by passing different values but also putting them in an array so that we can easily access it using [] bracket notation
const blocksArrayInstances = [
    new Block (10, 270),
    new Block (120, 270),
    new Block (230, 270),
    new Block (340, 270),
    new Block (450, 270)
]

// function to create block's
function createBlock(){
    for (let i = 0; i < blocksArrayInstances.length; i++){
    const createBlock = document.createElement('div');
    createBlock.classList.add('block');
    createBlock.style.left = blocksArrayInstances[i].bottomLeft[0] + 'px';
    createBlock.style.bottom = blocksArrayInstances[i].bottomLeft[1] + 'px';
    container.appendChild(createBlock);
    }
}

createBlock();

