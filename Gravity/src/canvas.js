import utils from './utils'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

const gravity = 1;
const friction = 0.89;

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    
    init();
})

addEventListener('click', () => {
    init();
})


// Utility Functions
const randomIntFromRange = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomColor = (colors) => {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Objects
function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = () => {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }
    
        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
    
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    };
}


// Implementation
let ballArray = [];

const init = () => {
    ballArray = []

    for (let i = 0; i < 400; i++) {
        const radius = randomIntFromRange(8, 20);
        const x = randomIntFromRange(radius, canvas.width - radius)
        const y = randomIntFromRange(0, canvas.height - radius)
        const dx = randomIntFromRange(-2, 2)
        const dy = randomIntFromRange(-2, 2)
        const color = randomColor(colors)
        ballArray.push(new Ball(x, y, dx, dy, radius, color))
    }
}

// Animation Loop
const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].update()
    }
}

init();
animate();

