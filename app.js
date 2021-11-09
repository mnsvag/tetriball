const allDivs = document.querySelectorAll(".pixel");
const blockTypes = {0: [-1, +9, +10, +11],
                    1: [+1, +9, +10, +11],
                    2: [0, +1, +9, +10],
                    3: [0, +9, +10, +11],
                    4: [-1, 0, +10, +11],
                    5: [-1, 0, +1]
                };
class Block {
    constructor(center, type) {
        this.center = center
        this.type=type;
    }
}

function constructBlock(center, type) {
    let newBlock = new Block(center, type)
    blockTypes[type.toString()].forEach(element => {
        allDivs[center+element].style.backgroundColor = "yellow";
    });
}

initialDiv = Math.floor(Math.random()*10)
randomType = Math.floor(Math.random()*6)
constructBlock(initialDiv, randomType)


