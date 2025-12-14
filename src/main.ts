//Noise generator (might implement my own later)
import { createNoise3D } from 'simplex-noise';
import { Vector } from "./vector";
import { Particle } from './particle';

const noise3D = createNoise3D();


//Changeable global constants
const zIncrement = 0.001;
const size = 50;
const noiseScale = 0.08;

const particleSpeed = 10;
const numParticles = 25000;
const particleSize = 0.25;
const particleColor = "rgba(0, 200, 110, 0.8)";



//CANVAS IMPLEMENTATION, IMPORTANT FOR RENDERING
//Get canvas from html
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//Initialize array of flow vectors

let cols: number;
let rows: number;
let flow: Vector[][] = [];

function setup(){
    cols = Math.floor(canvas.width / size);
    rows = Math.floor(canvas.height / size);

}

//Initialize particles
let particles = Array.from({ length: numParticles }, () => {
  return new Particle(Math.random() * canvas.width, Math.random() * canvas.height, particleSize, particleSpeed, particleColor);
})

//Animation Loop
let zOffset = 0;

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    
    flow = Array.from({ length: rows }, (_, y) =>
        Array.from({ length: cols }, (_, x) => {
          //generate a noise object
            const n = noise3D(
              x * noiseScale,
              y * noiseScale,
              zOffset
            );

            const angle = n * 2 * Math.PI; //The noise object gets converted to an angle in radians
            return new Vector(Math.cos(angle), Math.sin(angle)); //This makes a vector object to store in the 2d array (x = cos(angle), y = sin(angle))
        })
    );

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
      particle.update(flow, size);
      particle.display(ctx);
    }

    requestAnimationFrame(animate);
}

setup();
animate();
