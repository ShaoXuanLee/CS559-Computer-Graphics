/**
 * Starter file for 02-08-01.js - the only exercise of page 8 of Workbook 2
 */

// @ts-check
export {};

// Find the canvas and start!
var canvas = document.getElementById('box2canvas');
var ctx = canvas.getContext('2d');

let fireworks = [];
let particles = [];
let lasttime = undefined;

//first step click and make firework
canvas.onclick = function(event){
    const box = /** @type {HTMLCanvasElement} */ (event.target).getBoundingClientRect();
    const mouseX = event.clientX - box.left;
    const mouseY = event.clientY - box.top;
    fireworks.push(new Firework(mouseX, mouseY));
}

function Firework(x, y) {
    this.x = x;
    this.y = canvas.height;
    this.target = y;
    this.vx = Math.random() * 2 - 2;
    this.vy = Math.random() * -8 - 8;
    this.color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    this.radius = 10;
    this.life = true; 
}

//using prototype so that each firework object have access to the function
//learned from google
Firework.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
};

Firework.prototype.update = function() {
    if(this.y > this.target){
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2;
        this.radius *= 0.98;
    }
    else{
        this.life = false;
        createParticles(this.x, this.y, this.color);
    }
};

function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.color = color;
    this.radius = Math.random() * 2;
    this.life = 100;
}

Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
};

Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.02;
    this.radius *= 0.98;
    this.life--;

    if (this.life <= 0) {
        this.life = false;
    }
};

function createParticles(x, y, color) {
    for (var i = 0; i < 50; i++) {
        var particle = new Particle(x, y, color);
        particles.push(particle);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach(function(firework, index) {
        firework.draw();
        firework.update();
        if (!firework.life) {
            fireworks.splice(index, 1);
        }
    });

    particles.forEach(function(particle, index) {
        particle.draw();
        particle.update();
        if (!particle.life) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}
animate();