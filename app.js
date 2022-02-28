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
        // let myLeftMostCols;
        // for(let col=0;col<=2;col++){
        //     let found=false;
        //     for(let row=0;row<3;row++){
        //         if(this.blockArray.includes(matrix[row][col])){
        //             found=true;
        //             break;
        //         }
        //     }
        //     if(found){
        //         myLeftMostCol=col;
        //         break;
        //     }
        // }
        
        // //if leftmost col is border or has some filled div dont move, else move
        // for(let row=0; row <= 2 ; row++){
        //     let index = matrix[row][myLeftMostCol];
        //     if(!this.blockArray.includes(index)) continue
        //     let leftToLeftMostCol = this.center + index - 1;
        //     if(isPartOfBorder(leftToLeftMostCol) || isFilled(leftToLeftMostCol)) return;
        // }

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
        // let myRightMostCol;
        // for(let col=2;col >= 0;col--){
        //     let found=false;
        //     for(let row=0; row <= 2; row++){
        //         if(this.blockArray.includes(matrix[row][col])){
        //             found=true;
        //             break;
        //         }
        //     }
        //     if(found){
        //         myRightMostCol=col;
        //         break;
        //     }
        // }
        
        // //if leftmost col is border or has some filled div dont move, else move
        // for(let row=0; row <= 2 ; row++){
        //     let index = matrix[row][myRightMostCol];
        //     if(!this.blockArray.includes(index)) continue
        //     let rightToRightMostCol = this.center + index + 1;
        //     if(isPartOfBorder(rightToRightMostCol) || isFilled(rightToRightMostCol)) return;
        // }

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

        // let myDownMostRow;
        // for(let row=2;row >= 0;row--){
        //     let found=false;
        //     for(let col=0; col <= 2; col++){
        //         if(this.blockArray.includes(matrix[row][col])){
        //             found=true;
        //             break;
        //         }
        //     }
        //     if(found){
        //         myDownMostRow=row;
        //         break;
        //     }
        // }
        
        // //if leftmost col is border or has some filled div dont move, else move
        // for(let col=0; col <= 2 ; col++){
        //     let index = matrix[myDownMostRow][col];
        //     if(!this.blockArray.includes(index)) continue
        //     let downToDownMostCol = this.center + index + 12;
        //     if(isPartOfBorder(downToDownMostCol) || isFilled(downToDownMostCol)) {
                // newBlockFlag=true
                // this.blockArray.forEach(ele => {
                //     allDivs[this.center+ele].classList.remove("moving")
                //     allDivs[this.center+ele].classList.add("block")
                // })
                // clearInterval(this.intervalOfMovingDown)
                // document.removeEventListener('keydown', keyBoard)
        //         return
        //     }
        // }

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

    // rotateButton.addEventListener("click", ()=>{
    //     block.rotate();
    // });

    // downButton.addEventListener("click", ()=>{
    //      block.moveDown();
    //  });

    //1. bring new block
    block = constructBlock()

    //block.intervalOfIsActive   = setInterval(function() {block.move}, 10);
    block.intervalOfMovingDown = setInterval(function() {block.moveDown()}, 1000);

    document.addEventListener('keydown', keyBoard);
 
//    while(!newBlockFlag) {console.log("stuck")}

//     document.removeEventListener('keydown', keyBoard)
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
/*

Code/game structure
checkAndMoveDown(){
     if(block is currently active && can go down){
         moveDown();
     }
     else clearInterval(checkAndMoveDown)
}

updateIsActive(){
    checkIf touching down
    else
        clearInterval(updateIsActive)
}

function keyBoard(block){
    if user presses left go left ==> block.moveLeft()
    if user presses right go right
    if user presses space rotate
}

blockjourney(){

    createBlock

    setInterval(updateIsActive,100ms); //this will keep updating if the block is active
    setInterval( checkAndMoveDown, 1 second); //this will keep checking if the block is active and then move down every second
    
    document.addEventListener() ("keypress",keyBoard(block))
    while block.isActive{
       ;
    }
    document.removeEventListner()
}

while(game continues){
    blockJourney();
}
*/

var ball = new Image();
        
      document.addEventListener('mousemove', plankMovement);

      let current_y = 480;
      let current_x = 30;
      let current_time = Date.now();
      let speed =2.25;
      let angle=60;
      let theta,cos_theta, sin_theta;
      let plank_start = 30,plank_length=50;
      recalculateValues();

      function init(){
          ball.src = "https://cdn.britannica.com/68/195168-050-BBAE019A/football.jpg"
          let value = 20;
          let current_time = Date.now();
          window.requestAnimationFrame(draw);
        }

      function recalculateValues(){
        theta = angle*(Math.PI/180.0);
        cos_theta = Math.cos(theta);
        sin_theta = Math.sin(theta);
      }

      function plankMovement(e){
        plank_start = e.offsetX;
        
      }
      function isPartOfPlank(x,y){
        
        if(x >= plank_start && x <= plank_start+plank_length && y>= 480) return true;
        else return false;
      }

      function positionIsNotValid(x,y){
        if(x <= 30 || x >= 330) return true;
        if(y <= 30 || y >= 480) return true;
        return false;
      }

      function draw() {
        
		    var ctx = document.getElementById('canvas').getContext('2d');

        let cur = Date.now();
        let delta = cur - current_time;
        delta/= 25;


      
          current_y  = current_y + delta* speed*sin_theta;
          current_x  = current_x + delta* speed*cos_theta;

          let changed=false;

          if(isPartOfPlank(current_x,current_y))  {angle = 360-angle; changed=true;}
          if(current_y <= 30) {angle = 360-angle; changed=true;}
          if(current_x >= 330 || current_x <= 30) {angle = 180-angle; changed= true;}

          //console.log(val);

          recalculateValues();

          if(changed){
            current_y  = current_y + delta* speed*sin_theta;
            current_x  = current_x + delta* speed*cos_theta;

            current_y  = current_y + delta* speed*sin_theta;
            current_x  = current_x + delta* speed*cos_theta;
          }

          
        

        console.log(current_x,current_y);

        // if(val = isPartOfPlank(current_x,current_y)) angle = 360-angle;
        // //if(current_y >= 300) current_y = 500;

        // console.log(val);

        // //if(current_y >= 280 || current_y <= 10) angle = 360-angle;
        // if( current_y <= 10) angle = 360-angle;
        // if(current_x >= 280 || current_x <= 10) angle = 180-angle;

        // if(angle < 0 ) angle += 360;
        // if(angle >= 360) angle -= 360;

        // recalculateValues();

        // current_y  = current_y + delta* speed*sin_theta;
        // current_x  = current_x + delta* speed*cos_theta;

        

        

        current_time = cur;     
        
        ctx.clearRect(0, 0, 360, 510); // clear canvas  
        ctx.drawImage(ball, current_x, current_y,30,30);

        ctx.fillRect(plank_start,480,100,20);
        window.requestAnimationFrame(draw);

  
        
      }