class Grafics1d {
  constructor() {
    this.xmin = -10.0;
    this.xmax = 10.0;
    this.ymin = -10.0;
    this.ymax = 10.0;
    this.W = 120;
    this.H = 100;
    this.f = function (x) {
      return x * x - 9;
    }
    this.Float64Array = new Float64Array(this.W);
  }
  evaluate() {
    let j = 0;
    let dx = (this.xmax - this.xmin) / this.W;
    for(let i = this.xmin; i <= this.xmax; i += dx) {
      this.Float64Array[j] = this.f(i);
      j++;
    }
  }
  autodraw() {
    var fmax = this.Float64Array[0];
    var fmin = this.Float64Array[0];
    for(let i = this.xmin; i < this.xmax; i += 0.1) {
      fmax = Math.max(fmax, this.Float64Array[i]);
      fmin = Math.min(fmin, this.Float64Array[i]);
    }
    this.ymax = fmax;
    this.ymin = fmin;
  }
  draw() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.strokeRect(0, 0, this.W, this.H);
    ctx.beginPath();
    ctx.moveTo(0, this.H/2);
    ctx.lineTo(this.W, this.H/2);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.W/2, 0);
    ctx.lineTo(this.W/2, this.H);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    // ctx.transform((this.xmax - this.xmin) / this.W, 0, 0, (this.ymax - this.ymin) / this.H, this.xmin, this.ymin);
    ctx.moveTo(0, 0);
    let j = 1;
    let dx = (this.xmax - this.xmin) / this.W;
    for(let x = this.xmin + dx; x <= this.xmax; x += dx) {
      ctx.lineTo((x-this.xmin)*this.W/(this.xmax-this.xmin), (this.Float64Array[j]-this.ymax)*this.H/(this.ymin-this.ymax));
      j++;
    }
    ctx.stroke();
  }
}
var grafic = new Grafics1d();
grafic.evaluate();
grafic.draw();

