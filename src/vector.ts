export class Vector {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector){
    this.x += v.x;
    this.y += v.y;
  }

  getAngle() {
    let angle = Math.atan2(this.y, this.x);
    if (angle < 0) angle += Math.PI * 2;
    return angle;
  }
}