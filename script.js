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

    bounceOffWalls() {
        if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx = -(this.dx);
        }
        if (this.y + this.dy > canvas.height - this.radius || this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        }
    }

    move() {
        this.draw();
        this.x += this.dx;
        this.y += this.dy;
        this.xRange = ants.map(ant => ant.x);
        this.yRange = ants.map(ant => ant.y);
        this.bounceOffWalls();
    }
}

const ants = [];

const getDistance = (x1, y1, x2, y2) => {
    const xDistance = x2 - x1;
    const yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + (yDistance, 2));
}

const spawnAnts = (num) => {
    for (let i = 0; i<num; i++){
        let radius = randomNum(6, 50);
        let x = randomNum(canvas.width - radius, radius);
        let y = randomNum(canvas.height - radius, radius);
        if (i !== 0) {
            for (let j = 0; j < ants.length; j++) {
                if (getDistance(x, y, ants[j].x, ants[j].y) - (ants[j].radius+radius) < 0) {
                    x = randomNum(canvas.width - radius, radius);
                    y = randomNum(canvas.height - radius, radius);
                    j = -1;
                }
            }
        }
        let dx = randomNum(-3, 3);
        let dy = randomNum(-3, 3)
        let antObj = new Ant(x, y, radius, dx, dy);
        ants.push(antObj);
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ants.forEach(ant => {
        ant.move();
    });  
    window.requestAnimationFrame(animate);
};

spawnAnts(10);
window.requestAnimationFrame(animate);

// //radius(x,y) difference
// //obj