function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

class Game {
    constructor(numOfImages) {
        this.elems = new Array(2 * numOfImages);
        this.finished = new Array(2 * numOfImages);
        this.src = document.getElementById("main_container");
        this.fistOpen = false;
        this.isSecondOpen = false;
        this.firstCard = 0;
        for(let i = 1; i <= numOfImages; ++i){
            this.elems[(i - 1) * 2] = i;
            this.elems[(i - 1) * 2 + 1] = i;
            this.finished[(i - 1) * 2] = false;
            this.finished[(i - 1) * 2 + 1] = false;
        }
        shuffleArray(this.elems);
        this.divs = new Array(2 * numOfImages);
        this.imgs = new Array(2 * numOfImages);
        for(let i = 0; i < this.elems.length; ++i) {
            this.divs[i] = document.createElement("div");
            this.divs[i].classList.add("grad");
            this.divs[i].classList.add("box")
            this.divs[i].addEventListener("click", () => {
                if(!this.finished[i]) {
                    this.#elemClicked(i);
                }
            })
            this.imgs[i] = document.createElement("img");
            this.imgs[i].src = `./img/${this.elems[i]}.png`;
            this.src.appendChild(this.divs[i]);
        }
    }

    #elemClicked(num) {
        if(this.isFirstOpen) {
            if(!this.isSecondOpen) {
                if(this.elems[this.firstCard] === this.elems[num]) {
                    this.#reverseCard(num, false);
                    this.isSecondOpen = true;
                    setTimeout(() => {
                        this.#removeCard(Math.max(num, this.firstCard));
                        this.#removeCard(Math.min(num, this.firstCard));
                        this.isSecondOpen = false;
                        this.isFirstOpen = false;
                        this.firstCard = 0;
                    }, 700)
                } 
                else {
                    this.#reverseCard(num, false);
                    this.isSecondOpen = true;
                    setTimeout(() => {
                        this.#reverseCard(num, true);
                        this.#reverseCard(this.firstCard, true)
                        this.isSecondOpen = false;
                        this.isFirstOpen = false;
                        this.firstCard = 0;
                    }, 500)
                }
            }
        }
        else  {
            this.isFirstOpen = true;
            this.firstCard = num;
            this.#reverseCard(num, false);
        }
    }

    #reverseCard(num, isOpen) {
        if(isOpen) {
            this.divs[num].classList.add("grad")
            this.divs[num].removeChild(this.imgs[num]);
        }
        else {
            this.divs[num].classList.remove("grad");
            this.divs[num].appendChild(this.imgs[num]);
        }
    }
    
    #removeCard(num) {
        this.divs[num].classList.add("finished");
        this.finished[num] = true;
    }
}

const game = new Game(20);
