function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

class Game {
    constructor(numOfImages) {
        this.elems = new Array(2 * numOfImages);
        this.src = document.getElementById("main_container");
        this.fistOpen = false;
        this.isSecondOpen = false;
        this.firstCard = 0;
        for(let i = 1; i <= numOfImages; ++i){
            this.elems[(i - 1) * 2] = i;
            this.elems[(i - 1) * 2 + 1] = i;
        }
        shuffleArray(this.elems);
        this.divs = new Array(2 * numOfImages);
        this.imgs = new Array(2 * numOfImages);
        let res = new String()
        for(let i = 0; i < this.elems.length; ++i) {
            if(i % 5 == 0) {
                res += "\n";
            }
            res += this.elems[i].toString() + '\t';
            
            this.divs[i] = document.createElement("div");
            this.divs[i].classList.add("grad");
            this.divs[i].classList.add("box")
            this.divs[i].addEventListener("click", () => {
                console.log(i);
                this.#elemClicked(i);
            })
            this.imgs[i] = document.createElement("img");
            this.imgs[i].src = `./img/${this.elems[i]}.png`;
            this.src.appendChild(this.divs[i]);
        }
        console.log(res);
    }

    #elemClicked(num) {
        if(this.isFirstOpen) {
            if(!this.isSecondOpen) {
                if(this.elems[this.firstCard] === this.elems[num]) {
                    console.log(1, this.firstCard, num);
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
                    console.log(2, this.firstCard, num);
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
            console.log(3, this.firstCard, num);
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
        this.divs[num].style.display = "none";
    }
}

const game = new Game(20);
