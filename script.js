const canvas = document.querySelector('canvas');

canvas.width = 1200;
canvas.height = 600;

const ctx = canvas.getContext('2d');

const randomNum = (max, min) => {
    const generatedNum = Math.floor(Math.random() * (max - min) + min);
    // exclude 0
    if (generatedNum === 0) {
        return randomNum(max, min);
    }
    return generatedNum;
};

class Ant {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        console.log(this.x, this.y)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }

    get move() {
        this.draw();
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.dx > canvas.width-this.radius || this.x + this.dx < this.radius) {
            this.dx = -(this.dx);
        }
        if (this.y + this.dy > canvas.height-this.radius || this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        }
    }
}

const ants = [];

const spawnAnts = (num) => {
    for (let i = 0; i<num; i++){
        let radius = randomNum(6, 20);
        let x = randomNum(1200 - radius, radius);
        let y = randomNum(600 - radius, radius);
        let dx = randomNum(-3, 3);
        let dy = randomNum(-3, 3)
        let antObj = new Ant(x, y, radius, dx, dy);
        ants.push(antObj);
    }
};

spawnAnts(10);

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ants.forEach(ant => {
        ant.move;
    });  
    window.requestAnimationFrame(animate);
};
window.requestAnimationFrame(animate);

// //radius(x,y) difference
// //obj