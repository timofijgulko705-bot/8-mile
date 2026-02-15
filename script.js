const canvas = document.getElementById('neonCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width/2, y: canvas.height/2 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Line {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.colorPhase = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.speedX + (mouse.x - this.x) * 0.01;
        this.y += this.speedY + (mouse.y - this.y) * 0.01;

        // колір переливання
        this.colorPhase += 0.05;
        const r = Math.floor(128 + 127 * Math.sin(this.colorPhase)); // фіолет
        const g = Math.floor(128 + 127 * Math.sin(this.colorPhase + 2)); // блакит
        const b = Math.floor(128 + 127 * Math.sin(this.colorPhase + 4)); // синій
        this.color = `rgb(${r},${g},${b})`;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
    }
}

const lines = [];
for(let i = 0; i < 100; i++) {
    lines.push(new Line());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // малюємо лінії між точками
    for(let i = 0; i < lines.length; i++) {
        lines[i].update();
        lines[i].draw();
        for(let j = i+1; j < lines.length; j++) {
            const dx = lines[i].x - lines[j].x;
            const dy = lines[i].y - lines[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 100) {
                ctx.beginPath();
                ctx.moveTo(lines[i].x, lines[i].y);
                ctx.lineTo(lines[j].x, lines[j].y);
                ctx.strokeStyle = lines[i].color;
                ctx.lineWidth = 0.5;
                ctx.shadowBlur = 10;
                ctx.shadowColor = lines[i].color;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();

// адаптація при зміні розміру
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
