/* plot.js — a tiny, crisp 2D function plotter on canvas.
   World coords (math) -> screen coords (pixels), with grid, axes, curves, lines, points. */

class Plot {
  constructor(canvas, world) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.world = Object.assign({ xmin:-4, xmax:4, ymin:-3, ymax:5 }, world || {});
    this.resize();
    window.addEventListener('resize', () => { this.resize(); this._onResize && this._onResize(); });
  }

  onResize(fn){ this._onResize = fn; }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const r = this.canvas.getBoundingClientRect();
    this.W = Math.max(1, r.width); this.H = Math.max(1, r.height);
    this.canvas.width = this.W * dpr;
    this.canvas.height = this.H * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // world -> screen
  sx(x){ const {xmin,xmax}=this.world; return (x-xmin)/(xmax-xmin)*this.W; }
  sy(y){ const {ymin,ymax}=this.world; return this.H - (y-ymin)/(ymax-ymin)*this.H; }

  clear(){ this.ctx.clearRect(0,0,this.W,this.H); }

  grid(step=1){
    const c=this.ctx, {xmin,xmax,ymin,ymax}=this.world;
    c.lineWidth=1; c.strokeStyle='rgba(91,140,255,0.10)';
    c.beginPath();
    for(let x=Math.ceil(xmin/step)*step; x<=xmax; x+=step){ c.moveTo(this.sx(x),0); c.lineTo(this.sx(x),this.H); }
    for(let y=Math.ceil(ymin/step)*step; y<=ymax; y+=step){ c.moveTo(0,this.sy(y)); c.lineTo(this.W,this.sy(y)); }
    c.stroke();
  }

  axes(){
    const c=this.ctx;
    c.lineWidth=1.5; c.strokeStyle='rgba(148,163,196,0.55)';
    c.beginPath();
    c.moveTo(0,this.sy(0)); c.lineTo(this.W,this.sy(0));   // x-axis
    c.moveTo(this.sx(0),0); c.lineTo(this.sx(0),this.H);   // y-axis
    c.stroke();
    // ticks/labels
    c.fillStyle='rgba(148,163,196,0.7)'; c.font='11px Inter, sans-serif';
    c.textAlign='center'; c.textBaseline='top';
    const {xmin,xmax}=this.world;
    for(let x=Math.ceil(xmin); x<=xmax; x++){ if(x!==0) c.fillText(x, this.sx(x), this.sy(0)+4); }
  }

  curve(fn, color, width=2.5){
    const c=this.ctx; c.lineWidth=width; c.strokeStyle=color;
    c.lineJoin='round'; c.beginPath();
    let started=false;
    for(let px=0; px<=this.W; px+=1.5){
      const x=this.world.xmin + px/this.W*(this.world.xmax-this.world.xmin);
      const y=fn(x);
      if(!isFinite(y)){ started=false; continue; }
      const py=this.sy(y);
      if(py<-2000||py>this.H+2000){ started=false; continue; }
      if(!started){ c.moveTo(px,py); started=true; } else c.lineTo(px,py);
    }
    c.stroke();
  }

  // full straight line through (x0,y0) with given slope, drawn across the view
  line(x0,y0,slope,color,width=2,dash=null){
    const c=this.ctx; c.save();
    c.lineWidth=width; c.strokeStyle=color;
    if(dash) c.setLineDash(dash);
    const {xmin,xmax}=this.world;
    c.beginPath();
    c.moveTo(this.sx(xmin), this.sy(y0+slope*(xmin-x0)));
    c.lineTo(this.sx(xmax), this.sy(y0+slope*(xmax-x0)));
    c.stroke(); c.restore();
  }

  segment(x1,y1,x2,y2,color,width=2){
    const c=this.ctx; c.lineWidth=width; c.strokeStyle=color;
    c.beginPath(); c.moveTo(this.sx(x1),this.sy(y1)); c.lineTo(this.sx(x2),this.sy(y2)); c.stroke();
  }

  point(x,y,color,r=5){
    const c=this.ctx; c.fillStyle=color;
    c.beginPath(); c.arc(this.sx(x),this.sy(y),r,0,Math.PI*2); c.fill();
    c.lineWidth=2; c.strokeStyle='rgba(255,255,255,0.85)'; c.stroke();
  }
}
