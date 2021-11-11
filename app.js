const allDivs = document.querySelectorAll("div");
const rotateButton = document.getElementById("rotateButton")
const downButton  =  document.getElementById("downButton")
const leftButton  =  document.getElementById("leftButton")
const rightButton  =  document.getElementById("rightButton")
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

// const bottomMost = [11, 12, 13]
// const leftMost = [-13, -1, 11]
// const rightMost = [-11, 1, 13]

const matrix = [[-13, -12, -11],
                [-1, 0, +1],
                [+11, +12, +13]];

var lastRow;
var col=0;
var row=0;
for(var row=2; row>=0; row--) {
    
}

const blockTypes = {0: [-1, +11, +12, +13],
                    1: [+1, +11, +12, +13],
                    2: [0, +1, +11, +12],
                    3: [0, +11, +12, +13],
                    4: [-1, 0, +12, +13],
                    5: [-1, 0, +1],
                    6: [-1, 0, +11, +12]
                };

class Block {
    constructor(center, type,color) {
        this.center = center
        this.type=type;
        this.color = color;
        this.blockArray = blockTypes[type.toString()]
        this.isActive= true;
        this.intervalOfMovingDown = null;
        this.intervalOfIsActive =  null;
    }

    updateIsActive(){
        // console.log("i am in update is active")
        // console.log(this)
        // console.log(this.blockArray)

        //checks if bottom is touching some div, if yes, updates isActive, else clear interval for checking UpdateIsActive
       
        // this.blockArray.forEach( ele => {
        //     if(allDivs[this.center+ele + 10].style.backgroundColor != "white");
        //        // this.isActive = false;
        // })

        bottomMost.forEach(ele => {
            
            if(this.blockArray.includes(ele) && 
                ((allDivs[this.center+ele+12].classList.contains("border")) ||
                     allDivs[this.center+ele+10].style.backgroundColor=="red")) {
                console.log("check", ele)
                this.isActive=false;
            }
        })

        if(this.isActive==false){
            clearInterval(this.intervalOfIsActive);
        }
    }

    checkAndMoveDown(){
        //if isActive is true, go down else clear Interval for going down
        if(this.isActive==true){
            this.moveDown();
        }
        else
            clearInterval(this.intervalOfMovingDown);

    }

    moveLeft() {
        // // this.blockArray.forEach(ele => {
        //     if it contains left element then check if it is border
        // //     if(leftMost.includes(ele) && allDivs[center+ele]) {

        // //     }
        //     else move
        // // })
        
    }

    moveRight() {

    }

    moveDown() {
        this.blockArray.forEach(ele => {
            allDivs[this.center+ele].style.backgroundColor="white"
        })

        this.center += 12;
        

        this.blockArray.forEach(ele => {
            allDivs[this.center+ele].style.backgroundColor=this.color
        })


    }

    rotate() {
       this.blockArray.forEach(ele => {
           allDivs[this.center+ele].style.backgroundColor="white"
       })

        this.blockArray = this.blockArray.map(ele =>{
            return rotateMap.get(ele);
        })

        this.blockArray.forEach(ele => {
            allDivs[this.center+ele].style.backgroundColor=this.color
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
        allDivs[center+element].style.backgroundColor = color;
    });

    return newBlock;
}




//onLoad 

var block;
// var intervalOfMovingDown;
// var intervalOfIsActive;

function blockJourney() {

    rotateButton.addEventListener("click", ()=>{
        block.rotate();
    });

    downButton.addEventListener("click", ()=>{
         block.moveDown();
     });

    //1. bring new block
    block = constructBlock()

    block.intervalOfIsActive   = setInterval(function() {block.updateIsActive()}, 10);
    block.intervalOfMovingDown = setInterval(function() {block.checkAndMoveDown()}, 1000);

    document.addEventListener('keydown', (event) => {
        
        const keyName = event.key;
        if(keyName==' '){
            //user pressed spacebar
            block.rotate();
        }
        if(keyName == 'arrowLeft'){
            block.moveLeft();
        }
        if(keyName == 'arrowRight'){
            block.moveRight();
        }
        //alert(keyName);
        
    });

    // while(block.isActive){

        
    // }
    
    

    //2. move the block down
    //setInterval(moveDown, 50)

    //while the block does not hit bottom or another block -->
        
        //2. move left and right according to press
        //onPress()

        //3. once it hits, block unactive

    //bottommost or another block stop movement and call new blockJourney

//    rotateButton.addEventListener("click", ()=>{
//        block.rotate();
//    });
//    downButton.addEventListener("click", ()=>{
//         block.moveDown();
//     });
}

blockJourney();


