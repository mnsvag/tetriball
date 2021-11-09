const allDivs = document.querySelectorAll(".pixel");
const rotateButton = document.getElementById("rotateButton")
const downButton  =  document.getElementById("downButton")

//map for roatation
const rotateMap = new Map();
// -11 will become -9
rotateMap.set(-11,-9)
rotateMap.set(-10,1)
rotateMap.set(-9,11)
rotateMap.set(-1,-10)
rotateMap.set(0,0)
rotateMap.set(1,10)
rotateMap.set(9,-11)
rotateMap.set(10,-1)
rotateMap.set(11,9)

const blockTypes = {0: [-1, +9, +10, +11],
                    1: [+1, +9, +10, +11],
                    2: [0, +1, +9, +10],
                    3: [0, +9, +10, +11],
                    4: [-1, 0, +10, +11],
                    5: [-1, 0, +1],
                    6: [-1, 0, +9, +10]
                };
class Block {
    constructor(center, type,color) {
        this.center = center
        this.type=type;
        this.color = color;
        this.blockArray = blockTypes[type.toString()]
    }

    

    moveLeft() {
        
    }

    moveRight() {

    }

    moveDown() {
        this.blockArray.forEach(ele => {
            allDivs[this.center+ele].style.backgroundColor="white"
        })

        console.log(this.center);
        this.center += 10;
        console.log(this.center);
        

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
    center=14
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

function blockJourney() {
    //1. bring new block
    block = constructBlock()
    

    //2. move the block down
    //setInterval(moveDown, 50)

    //while the block does not hit bottom or another block -->
        
        //2. move left and right according to press
        //onPress()

        //3. once it hits, block unactive

    //bottommost or another block stop movement and call new blockJourney

   rotateButton.addEventListener("click", ()=>{
       block.rotate();
   });
   downButton.addEventListener("click", ()=>{
        block.moveDown();
    });
}

blockJourney();


