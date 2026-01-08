//Noise generator (might implement my own later)
import { createNoise3D } from 'simplex-noise';
import { Particle } from './particle';

const noise3D = createNoise3D();


//Changeable global constants
const zIncrement = 0.001;
const size = 50;
const noiseScale = 0.08;

const particleSpeed = 15;
const numParticles = 50000;
const particleSize = 1;
const baseHue = 0;



//CANVAS IMPLEMENTATION, IMPORTANT FOR RENDERING
//Get canvas from html
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randomSimilarColor(
  baseHue: number,
  hueVariance = 50,
  sat = 70,
  satVariance = 5,
  light = 50,
  lightVariance = 5,
  alpha = 0.5
): string {
  const h = baseHue + (Math.random() * 2 - 1) * hueVariance;
  const s = sat + (Math.random() * 2 - 1) * satVariance;
  const l = light + (Math.random() * 2 - 1) * lightVariance;

  return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
}


//Initialize array of flow directions

let cols: number;
let rows: number;
let flow_angles: Float32Array;

function setup(){
    cols = Math.floor(canvas.width / size);
    rows = Math.floor(canvas.height / size);
    flow_angles = new Float32Array(cols * rows);
}

//Initialize particles
let particles = Array.from({ length: numParticles }, () => {
  return new Particle(Math.random() * canvas.width, Math.random() * canvas.height, particleSize, particleSpeed, randomSimilarColor(baseHue));
})

//Animation Loop
let zOffset = 0;

function updateFlowField() {
  let i = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const n = noise3D(x * noiseScale, y * noiseScale, zOffset);
      flow_angles[i++] = n * Math.PI * 2;
    }
  }
}

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    updateFlowField();

/*
    //DISPLAY FOR VECTORS
    ctx.strokeStyle = "blue";
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const v = flow[y][x];
        const px = x * size;
        const py = y * size;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + v.x * size * 0.5, py + v.y * size * 0.5);
        ctx.stroke();
      }
    }
/**/
    zOffset += zIncrement;
    
    for (const particle of particles) {
      particle.update(flow_angles, size, rows, cols);
    }

    //Draw particles
    ctx.beginPath();

    for (const p of particles) {
      ctx.fillStyle = p.color;
      ctx.rect(p.px, p.py, particleSize, particleSize);
    }

    ctx.fill();

    requestAnimationFrame(animate);
}

setup();
animate();
