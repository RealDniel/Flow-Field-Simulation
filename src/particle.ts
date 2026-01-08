export class Particle {

    speedLimit: number;
    size: number;
    px: number;
    py: number;
    vx: number;
    vy: number;
    color: string;

    constructor(x: number, y: number, size: number, speedLimit: number, color: string){
        this.px = x;
        this.py = y;
        this.vx = 0;
        this.vy = 0;
        this.speedLimit = speedLimit;
        this.size = size;
        this.color = color;
    }

    update(flow: Float32Array, size: number, rows: number, cols: number){
        this.px += this.vx;
        this.py += this.vy;
        this.checkEdge();

        var i = Math.floor(this.px / size);
        var j = Math.floor(this.py / size);
        i = Math.max(0, Math.min(i, cols - 1));
        j = Math.max(0, Math.min(j, rows - 1));
        let angle = flow[i + j * cols];
        
        this.vx += Math.cos(angle);
        this.vy += Math.sin(angle);
        this.limitVelocity();
    }

    limitVelocity(){
        const v2 = this.vx * this.vx + this.vy * this.vy;
        if (v2 > this.speedLimit * this.speedLimit) {
            const inv = this.speedLimit / Math.sqrt(v2);
            this.vx *= inv;
            this.vy *= inv;
        }
    }

    checkEdge(){
        if(this.px > window.innerWidth){
            this.px = 0;
        } else if(this.px < 0){
            this.px = window.innerWidth;
        }

        if(this.py > window.innerHeight){
            this.py = 0;
        } else if(this.py < 0){
            this.py = window.innerHeight;
        }
    }
}