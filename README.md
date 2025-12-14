## Install dependencies
`
npm install
`

## Run the simulation
`
npm run dev
`

## Cool things you can change:

### All of these are in src/main.ts

zIncrement = How fast noise vectors are changed (How volatile you want the directions to be) Usually keep between 0.001 and 0.05
size = How large of an area each noise vector takes up. (Higher = less variation in direction)
noiseScale = How noisy you want the noise vectors to be. (Higher = less correlation between neighboring vectors)

const particleSpeed = How fast the particles can travel (Speed Limit), I'd keep below 20
const numParticles = Number of particles rendered. When I was testing, the most I could get to run smoothly was 25,000
const particleSize = Size of each particle (pixels)
const particleColor = A string passed to the particle constructor that determines its color when displayed as an ellipsoid

### Others

In the animate function, there's a commented out block of code that displays the noise vectors. If you uncomment this, you can see the directional noise vectors.

Also in the animate function, the ctx fillstyle can be changed so that particles leave more of a trail if you change the opacity.

