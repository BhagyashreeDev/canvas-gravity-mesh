const canvas = document.getElementById("meshCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {x: null, y: null};
window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseRadius = 2;
        this.radius = this.baseRadius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#8ba4bf";
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;

        let distance = Math.sqrt(dx*dx+dy*dy);

        if (distance < 100) {
            this.radius = this.baseRadius + (100 - distance) * 0.05;
        } else {
            this.radius = this.baseRadius;
        }

        this.draw();
    }
}

let dotsArray = [];
let spacing = 40;

function init() {
    dotsArray = [];
    for (let x = spacing; x < canvas.width; x +=spacing) {
        for (let y = spacing; y < canvas.height; y += spacing) {
            dotsArray.push(new Dot(x, y));
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i=0;i<dotsArray.length;i++) {
        dotsArray[i].update();
    }
}

init();
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
