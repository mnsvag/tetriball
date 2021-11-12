const allDivs = document.querySelectorAll("div");
const rotateButton = document.getElementById("rotateButton")
const downButton  =  document.getElementById("downButton")
const leftButton  =  document.getElementById("leftButton")
const rightButton  =  document.getElementById("rightButton")
var newBlockFlag=true
// allDivs[144].style.backgroundColor = "red";
// allDivs[104].style.backgroundColor = "red";
//console.log(allDivs[100].style.getBackgroundColor)

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

    // updateIsActive(){
    //     console.log("i am in update is active")
    //     console.log(this)
    //     console.log(this.blockArray)

    //     checks if bottom is touching some div, if yes, updates isActive, else clear interval for checking UpdateIsActive
       
    //     this.blockArray.forEach( ele => {
    //         if(allDivs[this.center+ele + 10].style.backgroundColor != "white");
    //            // this.isActive = false;
    //     })

    //     bottomMost.forEach(ele => {
            
    //         if(this.blockArray.includes(ele) && 
    //             ((allDivs[this.center+ele+12].classList.contains("border")) ||
    //                  allDivs[this.center+ele+10].style.backgroundColor=="red")) {
    //             console.log("check", ele)
    //             this.isActive=false;
    //         }
    //     })

    //     if(this.isActive==false){
    //         clearInterval(this.intervalOfIsActive);
    //     }
    // }

    // checkAndMoveDown(){
    //     //if isActive is true, go down else clear Interval for going down
    //     if(this.isActive==true){
    //         this.moveDown();
    //     }
    //     else
    //         clearInterval(this.intervalOfMovingDown);

    // }

    moveLeft() {
        let myLeftMostCol;
        for(let col=0;col<=2;col++){
            let found=false;
            for(let row=0;row<=3;row++){
                if(this.blockArray.includes(matrix[row][col])){
                    found=true;
                    break;
                }
            }
            if(found){
                myLeftMostCol=col;
                break;
            }
        }
        //console.log(`my center is ${this.center}`);
        //console.log(`my leftmost col is ${myLeftMostCol}`);
        
        //if leftmost col is border or has some filled div dont move, else move
        for(let row=0; row <= 2 ; row++){
            let index = matrix[row][myLeftMostCol];
            if(!this.blockArray.includes(index)) continue
            let leftToLeftMostCol = this.center + index - 1;
            if(isPartOfBorder(leftToLeftMostCol) || isFilled(leftToLeftMostCol)) return;
        }


        this.blockArray.forEach(ele => {
            allDivs[this.center+ele].classList.remove("block")
        })

        console.log(this.center, this.type)
        this.center -= 1;
        console.log(this.center, this.type)

        this.blockArray.forEach(ele => {
            allDivs[this.center+ele].classList.add("block")
        })
    }

    moveRight() {
        let myRightMostCol;
        for(let col=2;col >= 0;col--){
            let found=false;
            for(let row=0; row <= 2; row++){
                if(this.blockArray.includes(matrix[row][col])){
                    found=true;
                    break;
                }
            }
            if(found){
                myRightMostCol=col;
                break;
            }
        }
        //console.log(`my center is ${this.center}`);
        //console.log(`my leftmost col is ${myLeftMostCol}`);
        
        //if leftmost col is border or has some filled div dont move, else move
        for(let row=0; row <= 2 ; row++){
            let index = matrix[row][myRightMostCol];
            if(!this.blockArray.includes(index)) continue
            let rightToRightMostCol = this.center + index + 1;
            if(isPartOfBorder(rightToRightMostCol) || isFilled(rightToRightMostCol)) return;
        }


        this.blockArray.forEach(ele => {
            allDivs[this.center+ele].classList.remove("block")
        })

        console.log(this.center, this.type)
        this.center += 1;
        console.log(this.center, this.type)
        

        this.blockArray.forEach(ele => {
            allDivs[this.center+ele].classList.add("block")
        })

    }

    moveDown() {

        let myDownMostRow;
        for(let row=2;row >= 0;row--){
            let found=false;
            for(let col=0; col <= 2; col++){
                if(this.blockArray.includes(matrix[row][col])){
                    found=true;
                    break;
                }
            }
            if(found){
                myDownMostRow=row;
                break;
            }
        }
        //console.log(`my center is ${this.center}`);
        //console.log(`my leftmost col is ${myLeftMostCol}`);
        
        //if leftmost col is border or has some filled div dont move, else move
        for(let col=0; col <= 2 ; col++){
            let index = matrix[myDownMostRow][col];
            if(!this.blockArray.includes(index)) continue
            let downToDownMostCol = this.center + index + 12;
            if(isPartOfBorder(downToDownMostCol) || isFilled(downToDownMostCol)) {
                newBlockFlag=true
                clearInterval(this.intervalOfMovingDown)
                return
            }
        }

        this.blockArray.forEach(ele => {
            allDivs[this.center+ele].classList.remove("block")
        })

        this.center += 12;
        

        this.blockArray.forEach(ele => {
            allDivs[this.center+ele].classList.add("block")
        })


    }

    rotate() {
       this.blockArray.forEach(ele => {
           allDivs[this.center+ele].classList.remove("block")
       })

        this.blockArray = this.blockArray.map(ele =>{
            return rotateMap.get(ele);
        })

        this.blockArray.forEach(ele => {
            allDivs[this.center+ele].classList.add("block")
        })


    }
}

function constructBlock() {
    //center = Math.floor(Math.random()*8 + 1)
    center=17
    type = Math.floor(Math.random()*7)
    color = "red"
    let newBlock = new Block(center, type,color)
    newBlock.blockArray.forEach(element => {
        allDivs[center+element].classList.add("block");
    });

    return newBlock;
}

//onLoad 

var block;

function blockJourney() {

    rotateButton.addEventListener("click", ()=>{
        block.rotate();
    });

    downButton.addEventListener("click", ()=>{
         block.moveDown();
     });

    //1. bring new block
    block = constructBlock()

    //block.intervalOfIsActive   = setInterval(function() {block.move}, 10);
    block.intervalOfMovingDown = setInterval(function() {block.moveDown()}, 1000);

    document.addEventListener('keydown', (event) => {
        
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
        
        
    });
}

//blockJourney();

setInterval(()=> {
    console.log("checking")
    if(newBlockFlag) {
        newBlockFlag=false
        blockJourney()
    }
}, 1000)


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
    
    boolean eventListenerAdded=false;
    while block.isActive{
        eventListenerAdded=true;
        document.addEventListener() ("keypress",keyBoard(block))
    }
    if(eventListenerAdded) document.removeEventListner()
}

while(game continues){
    blockJourney();
}
*/

