const allDivs = document.querySelectorAll("div");
const rotateButton = document.getElementById("rotateButton")
const downButton  =  document.getElementById("downButton")
const leftButton  =  document.getElementById("leftButton")
const rightButton  =  document.getElementById("rightButton")
var newBlockFlag=true

//map for roatation
const rotateMap = new Map();
rotateMap.set(-13,-11)
rotateMap.set(-12,1)
rotateMap.set(-11,13)
rotateMap.set(-1,-12)
rotateMap.set(0,0)
rotateMap.set(1,12)
rotateMap.set(11,-13)
rotateMap.set(12,-1)
rotateMap.set(13,11)

const matrix = [[-13, -12, -11],
                [-1, 0, +1],
                [+11, +12, +13]];

const blockTypes = {0: [-1, +11, +12, +13],
                    1: [+1, +11, +12, +13],
                    2: [0, +1, +11, +12],
                    3: [0, +11, +12, +13],
                    4: [-1, 0, +12, +13],
                    5: [-1, 0, +1],
                    6: [-1, 0, +11, +12]
                };

function isPartOfBorder(index){
    if(allDivs[index].classList.contains('border')) {return true;}
    else return false;
}

function isFilled(index){
    //return false;
    if(allDivs[index].classList.contains("block")) return true;
    else return false;
}

function removeCurrentPosition(block) {
    block.blockArray.forEach(ele => {
        allDivs[block.center+ele].classList.remove("moving")
    })
}

function addNewPosition(block) {
    block.blockArray.forEach(ele => {
        allDivs[block.center+ele].classList.add("moving")
    })
}

class Block {
    constructor(center, type,color) {
        this.center = center
        this.type=type;
        this.color = color;
        this.blockArray = blockTypes[type.toString()]
        //this.isActive= true;
        this.intervalOfMovingDown = null;
        //this.intervalOfIsActive =  null;
    }

    moveLeft() {

        const leftBorder = [];
        for(var row=0; row<3; ++row) {
            for(var col=0; col<3; ++col) {
                if(this.blockArray.includes(matrix[row][col])) {
                    leftBorder.push(matrix[row][col])
                    break
                }
            }
        }

        for(var i=0; i<leftBorder.length; ++i) {
            let leftIndex = leftBorder[i]+this.center-1;
            if(isPartOfBorder(leftIndex) || isFilled(leftIndex)) return;
        }


        removeCurrentPosition(this)
        this.center -= 1;
        addNewPosition(this)
    }

    moveRight() {

        const rightBorder = [];
        for(var row=0; row<3; ++row) {
            for(var col=2; col>=0; --col) {
                if(this.blockArray.includes(matrix[row][col])) {
                    rightBorder.push(matrix[row][col])
                    break
                }
            }
        }

        for(var i=0; i<rightBorder.length; ++i) {
            let rightIndex = rightBorder[i]+this.center+1;
            if(isPartOfBorder(rightIndex) || isFilled(rightIndex)) return;
        }


        removeCurrentPosition(this)
        this.center += 1;   
        addNewPosition(this)

    }

    moveDown() {

        const downBorder = [];
        for(var col=0; col<3; ++col) {
            for(var row=2; row>=0; --row) {
                if(this.blockArray.includes(matrix[row][col])) {
                    downBorder.push(matrix[row][col])
                    break
                }
            }
        }

        for(var i=0; i<downBorder.length; ++i) {
            let downIndex = downBorder[i]+this.center+12;
            if(isPartOfBorder(downIndex) || isFilled(downIndex)) {
                newBlockFlag=true
                this.blockArray.forEach(ele => {
                    allDivs[this.center+ele].classList.remove("moving")
                    allDivs[this.center+ele].classList.add("block")
                })
                clearInterval(this.intervalOfMovingDown)
                document.removeEventListener('keydown', keyBoard)
                return;
            }
        }

        removeCurrentPosition(this)
        this.center += 12;
        addNewPosition(this)
    }

    rotate() {

        for (var i=0; i<this.blockArray.length; i++) {
            let rotatedElement = this.center + rotateMap.get(this.blockArray[i]);
            if( (isPartOfBorder(rotatedElement) || isFilled(rotatedElement)) 
              && !this.blockArray.includes(rotateMap.get(this.blockArray[i])))
                return
        }

        removeCurrentPosition(this)
        this.blockArray = this.blockArray.map(ele =>{
            return rotateMap.get(ele);
        })
        addNewPosition(this)
    }
}

function constructBlock() {
    //center = Math.floor(Math.random()*8 + 1)
    center=17
    type = Math.floor(Math.random()*7)
    let newBlock = new Block(center, type)
    newBlock.blockArray.forEach(element => {
        allDivs[center+element].classList.add("moving");
    });

    return newBlock;
}

//onLoad

function keyBoard(event) {
    const keyName = event.key;
    if(keyName==' '){
        //user pressed spacebar
        block.rotate();
    }
    else if(keyName == 'ArrowLeft'){
        block.moveLeft();
    }
    else if(keyName == 'ArrowRight'){
        block.moveRight();
    }
    else if(keyName == 'ArrowDown'){
        block.moveDown();
    }
    //alert(keyName)
}

var block;

function blockJourney() {

    //1. bring new block
    block = constructBlock()

    //block.intervalOfIsActive   = setInterval(function() {block.move}, 10);
    block.intervalOfMovingDown = setInterval(function() {block.moveDown()}, 1000);

    document.addEventListener('keydown', keyBoard);
}

//blockJourney();

function checkGameOver() {
    for(var i=14; i<24; ++i) {
        if(isFilled(i)) {
            console.log("its weird")
            return true
        }
    }
    return false
}

gameInterval =  setInterval(()=> {
    if(newBlockFlag && !checkGameOver()) {
        newBlockFlag=false
        blockJourney()
    }
    if(checkGameOver()) {
        clearInterval(gameInterval)
    }
}, 1000)



// if (checkGameOver()) {
//     console.log("huh")
//     clearInterval(gameInterval)
// }



        
document.addEventListener('mousemove', plankMovement);

//update canvas 30 times in 1s
const FPS = 50;

let current_y = canvas.height/2;
let current_x = canvas.width/2;
let ball_size = 15;
let speed =10;
let theta=Math.PI/3;
let cos_theta, sin_theta;
let plank_start = 0;
let plank_length=100;
let ctx = document.getElementById('canvas').getContext('2d');
calculateAngles();


setInterval(draw, 1000 / FPS);

function calculateAngles() {
    cos_theta = Math.cos(theta);
    sin_theta = Math.sin(theta);
}

function plankMovement(e) {
    plank_start = e.offsetX;
}

function isPartOfPlank (x,y) {
    if(x  >= plank_start 
        && x <= plank_start+plank_length 
        && y >= canvas.height-30) 
            return true;
    else return false;
}

function updateBallPosition() {
    current_y  = current_y +  speed*sin_theta;
    current_x  = current_x +  speed*cos_theta;
}

function checkForCollision() {
    let changed=false;

    if(isPartOfPlank(current_x,current_y)) {
        theta = 2*Math.PI-theta;
        changed=true;
    }

    if (current_y - ball_size <= 0) {
            theta = 2*Math.PI-theta;
            changed=true;
    }

    if (current_x - ball_size <= 0
        || current_x + ball_size >= canvas.width) {
            theta = Math.PI-theta;
            changed= true;
    }

    calculateAngles();

    return changed;
}

function draw() {

    updateBallPosition();

    if(checkForCollision()) {
       updateBallPosition();
    }  

    ctx.clearRect(0, 0, 720, 510); // clear canvas  

    ctx.fillStyle = "yellow";
    ctx.fillRect(plank_start, canvas.height-30 , plank_length , 20);
    
    ctx.beginPath();
    ctx.arc(current_x, current_y, ball_size, 0, 2*Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}