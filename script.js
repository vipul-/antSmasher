const canvas = document.querySelector('canvas');

canvas.width = 1200;
canvas.height = 600;

const ctx = canvas.getContext('2d');


const randomCoordinate = max => Math.floor(Math.random() * max+1);

const spawnBalls = (num) => {
    for (let i = 0; i<num; i++){
        ctx.beginPath();
        ctx.arc(randomCoordinate(1200), randomCoordinate(600), 15, 0, Math.PI * 2, false);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }
}

spawnBalls(10);
