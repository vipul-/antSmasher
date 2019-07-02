const canvas = document.querySelector('canvas');

canvas.width = 1200;
canvas.height = 600;

const ctx = canvas.getContext('2d');

const randomGenerator = (max, min) => Math.random() * (max - min) + min;

class Ant {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }
}

const ants = [];



const antGenerator = (x, y, radius) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

const radiusCoordinates = [];

const spawnAnts = (num, radius) => {
    for (let i = 0; i<num; i++){
        let x = randomCoordinate(1200 - radius, radius);
        let y = randomCoordinate(600 - radius, radius);
        let antObj = {
            x,
            y,
            radius,
            dx,
            dy,
        } 
        ants.push(antObj);
    }
};

let a =50;
let b= 50;
const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    antGenerator(a,b, 12);
    a += 2;
    b += -2;
    console.log(x,y)
};
setInterval(draw, 10);

spawnAnts(0, 12);

//radius(x,y) difference
//obj
//velocity, (dy,dx) => random

