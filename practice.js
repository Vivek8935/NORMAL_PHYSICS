/** @type{HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
const numberOfParticles = 1000;

const title = document.getElementById("title");
let titleMeasurements = title.getBoundingClientRect();

let titleDetails = {
  x: titleMeasurements.left,
  y: titleMeasurements.top,
  width: titleMeasurements.width,
  height: 15,
};

class particle {
  constructor() {
    this.x = Math.random() * canvas.width - Math.random() * 200;
    this.y = 0;
    this.speedY = Math.random() * 5 + 1;
    this.directionX = -0.4;
    this.radius = Math.random() * 4 + 4;
  }
  update() {
    this.y += this.speedY;
    this.x += this.directionX;
    this.speedY += 0.05;
    if (this.y > canvas.height + this.radius) {
      this.x = Math.random() * canvas.width - Math.random() * 200;
      this.y = 0;
      this.speedY = Math.random() * 5 + 1;
      this.radius = Math.random() * 4 + 4;
    }
    if (
      this.x < titleDetails.width + titleDetails.x &&
      this.x + this.radius > titleDetails.x &&
      this.y < titleDetails.height + titleDetails.y &&
      this.y + this.radius > titleDetails.y
    ) {
      this.y -= 4;
      this.speedY *= -0.45;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

const particleCreation = () => {
  particleArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particleArray.push(new particle());
  }
};

particleCreation();

function handleParticles() {
  particleArray.forEach((particle) => {
    particle.draw();
    particle.update();
  });
}

const animate = () => {
  ctx.fillStyle = `rgb(255,255,255,0.1)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  ctx.fillStyle = `rgb(0,0,0,1)`;
  ctx.fillRect(
    titleDetails.x,
    titleDetails.y,
    titleDetails.width,
    titleDetails.height
  );
  requestAnimationFrame(animate);
};

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  titleMeasurements = title.getBoundingClientRect();

  titleDetails = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: 15,
  };
  particleCreation();
});
