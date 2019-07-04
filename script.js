const canvas = document.querySelector('canvas');

canvas.width = 1200;
canvas.height = 600;

const colorPallets = [
    '#271f30',
    '#accbe1',
    '#6c5a49',
    '#c8ad55',
    '#9bc59d',
    '#de6c83',
    '#2cf6b3'
];

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
    constructor(x, y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        // ctx.strokeStyle = this.color;
        // ctx.stroke();
        // ctx.closePath();
    }

    bounceOffWalls(ants) {
        for (let i = 0; i < ants.length; i++) {
            if (this === ants[i]) continue;
            if (getDistance(this.x, this.y, ants[i].x, ants[i].y) - (ants[i].radius + this.radius) < 0) {
                collisionEffect(this, ants[i]);
            }
        }
        if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx = -(this.dx);
        }
        if (this.y + this.dy > canvas.height - this.radius || this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        }
    }

    move(ants) {
        this.draw();

        this.bounceOffWalls(ants);
        this.x += this.dx;
        this.y += this.dy;
    }
}

const ants = [];

const rotate = (dx, dy, angle) => {
    return {
        dx: dx * Math.cos(angle) - dy * Math.sin(angle),
        dy: dx * Math.sin(angle) + dy * Math.cos(angle)
    }
}

const collisionEffect = (ant, otherAnt) => {
    const angle = -Math.atan2(otherAnt.y - ant.y, otherAnt.x - ant.x);
    const u1 = rotate(ant.dx, ant.dy, angle);
    const u2 = rotate(otherAnt.dx, otherAnt.dy, angle);

    let m1 = 1;
    let m2 = 1;
    if (ant.mass) {
        m1 = ant.mass;
        m2 = otherAnt.mass;
    }
    const v1 = {
        dx: ((m1 - m2) * u1.dx / (m1 + m2)) + (2 * m2 * u2.dx / (m1 + m2)),
        dy: u1.dy
    }

    const v2 = {
        dx: ((m1 - m2) * u2.dx / (m1 + m2)) + (2 * m2 * u1.dx / (m1 + m2)),
        dy: u2.dy
    }

    const rotatedv1 = rotate(v1.dx, v1.dy, -angle);
    const rotatedv2 = rotate(v2.dx, v2.dy, -angle);

    ant.dx = rotatedv1.dx;
    ant.dy = rotatedv1.dy;

    otherAnt.dx = rotatedv2.dx;
    otherAnt.dy = rotatedv2.dy;
};

const getDistance = (x1, y1, x2, y2) => {
    const xDistance = x2 - x1;
    const yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

const spawnAnts = (num) => {
    for (let i = 0; i < num; i++) {
        let radius = randomNum(6, 50);
        let x = randomNum(canvas.width - radius, radius);
        let y = randomNum(canvas.height - radius, radius);
        if (i !== 0) {
            for (let j = 0; j < ants.length; j++) {
                if (getDistance(x, y, ants[j].x, ants[j].y) - (ants[j].radius + radius) < 0) {
                    x = randomNum(canvas.width - radius, radius);
                    y = randomNum(canvas.height - radius, radius);
                    j = -1;
                }
            }
        }
        let dx = randomNum(-3, 3);
        let dy = randomNum(-3, 3);
        let color = colorPallets[randomNum(0, colorPallets.length)];
        let antObj = new Ant(x, y, radius, dx, dy, color);
        ants.push(antObj);
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ants.forEach(ant => {
        ant.move(ants);
    });
    window.requestAnimationFrame(animate);
};

spawnAnts(12);
window.requestAnimationFrame(animate);

// //radius(x,y) difference
// //obj