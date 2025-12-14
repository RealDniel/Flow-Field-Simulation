import { Vector } from "./vector";

export class Particle {

    speedLimit: number;
    size: number;
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    color: string;

    constructor(x: number, y: number, size: number, speedLimit: number, color: string){
        this.position = new Vector(x, y);
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.speedLimit = speedLimit;
        this.size = size;
        this.color = color;
    }

    update(flow: Vector[][], size: number){
        this.position.add(this.velocity);
        this.checkEdge();
        this.velocity.add(this.acceleration);
        this.limitVelocity();
        this.acceleration.x = 0;
        this.acceleration.y = 0;
        this.acceleration.add(this.findAccelVector(flow, size));
    }

    findAccelVector(flow: Vector[][], size: number) {
        var i = Math.floor(this.position.x / size);
        var j = Math.floor(this.position.y / size);
        i = Math.max(0, Math.min(i, flow[0].length - 1));
        j = Math.max(0, Math.min(j, flow.length - 1));
        var AccelVector = flow[j][i];

        return AccelVector;
    }

    limitVelocity(){
        var magnitude = Math.sqrt((this.velocity.x * this.velocity.x) + (this.velocity.y * this.velocity.y));
        if(magnitude > this.speedLimit) {
            this.velocity.x = Math.cos(this.velocity.getAngle()) * this.speedLimit;
            this.velocity.y = Math.sin(this.velocity.getAngle()) * this.speedLimit
        }
    }

    checkEdge(){
        if(this.position.x > window.innerWidth){
            this.position.x = 0;
        } else if(this.position.x < 0){
            this.position.x = window.innerWidth;
        }

        if(this.position.y > window.innerHeight){
            this.position.y = 0;
        } else if(this.position.y < 0){
            this.position.y = window.innerHeight;
        }
    }

    display(ctx: CanvasRenderingContext2D){
        const x = Math.round(this.position.x);
        const y = Math.round(this.position.y);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(x, y, this.size, this.size, 2 * Math.PI, 0, 2 * Math.PI);
        ctx.fill();
    }
}