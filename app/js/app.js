/* app.js — Lesson 1: The Circle Mystery.
   Left canvas: a disk cut into N rings.  Right canvas: those rings unrolled into
   bars standing under the line y = 2*pi*r, whose area -> pi*R^2 as N -> infinity. */

const R = 2;                       // radius of our circle
const TRUE_AREA = Math.PI * R * R; // pi * R^2
const C_INNER = [91, 140, 255];    // blue  (center rings)
const C_OUTER = [255, 209, 102];   // gold  (edge rings)

const lerp = (a, b, t) => a + (b - a) * t;
const mix  = (t) => `rgb(${Math.round(lerp(C_INNER[0],C_OUTER[0],t))},${Math.round(lerp(C_INNER[1],C_OUTER[1],t))},${Math.round(lerp(C_INNER[2],C_OUTER[2],t))})`;

// ---- canvases ----------------------------------------------------------------
const circleCanvas = document.getElementById('circleCanvas');
const cctx = circleCanvas.getContext('2d');

const bars = new Plot(document.getElementById('barsCanvas'), {
  xmin: -0.18, xmax: R + 0.22, ymin: -0.9, ymax: 2 * Math.PI * R * 1.12
});

// ---- controls ----------------------------------------------------------------
const nSlider = document.getElementById('nSlider');
const nVal = document.getElementById('nVal');
const nLabel = document.getElementById('nLabel');
const approxVal = document.getElementById('approxVal');
const trueVal = document.getElementById('trueVal');
const errVal = document.getElementById('errVal');
const animBtn = document.getElementById('animBtn');

// Right-endpoint Riemann sum of 2*pi*r on [0,R]  ->  pi*R^2 * (1 + 1/N)
function approxArea(N) {
  const dr = R / N;
  let sum = 0;
  for (let i = 1; i <= N; i++) sum += 2 * Math.PI * (i * dr) * dr;
  return sum;
}

// ---- draw: the circle of rings ----------------------------------------------
function drawCircle(N) {
  const dpr = window.devicePixelRatio || 1;
  const r = circleCanvas.getBoundingClientRect();
  circleCanvas.width = r.width * dpr; circleCanvas.height = r.height * dpr;
  cctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const W = r.width, H = r.height;
  cctx.clearRect(0, 0, W, H);

  const cx = W / 2, cy = H / 2;
  const rad = Math.min(W, H) * 0.42;

  // draw from outside in so inner rings sit on top
  for (let i = N; i >= 1; i--) {
    const outer = rad * (i / N);
    const t = (i - 0.5) / N;
    cctx.beginPath();
    cctx.arc(cx, cy, outer, 0, Math.PI * 2);
    cctx.fillStyle = mix(t);
    cctx.fill();
    if (N <= 80) {                 // ring outlines only when they'd be visible
      cctx.lineWidth = 1;
      cctx.strokeStyle = 'rgba(8,11,18,0.55)';
      cctx.stroke();
    }
  }
  // label
  cctx.fillStyle = 'rgba(232,237,247,0.85)';
  cctx.font = '600 13px Inter, sans-serif';
  cctx.textAlign = 'center';
  cctx.fillText(`${N} ring${N>1?'s':''} → a disk`, cx, cy + rad + 22);
}

// ---- draw: the unrolled bars under y = 2*pi*r --------------------------------
function drawBars(N) {
  bars.resize();
  bars.clear();
  bars.grid(1);
  bars.axes();

  const dr = R / N;
  // bars (right-endpoint rectangles)
  for (let i = 1; i <= N; i++) {
    const x0 = (i - 1) * dr, x1 = i * dr;
    const h = 2 * Math.PI * (i * dr);
    const t = (i - 0.5) / N;
    const px0 = bars.sx(x0), px1 = bars.sx(x1);
    const py0 = bars.sy(0), py1 = bars.sy(h);
    bars.ctx.fillStyle = mix(t);
    bars.ctx.globalAlpha = 0.55;
    bars.ctx.fillRect(px0, py1, Math.max(px1 - px0, 0.4), py0 - py1);
    bars.ctx.globalAlpha = 1;
    if (N <= 80) { bars.ctx.strokeStyle = 'rgba(8,11,18,0.5)'; bars.ctx.lineWidth = 1; bars.ctx.strokeRect(px0, py1, px1 - px0, py0 - py1); }
  }

  // the ideal line y = 2*pi*r  and the triangle it bounds
  bars.line(0, 0, 2 * Math.PI, 'rgba(255,209,102,0.95)', 3);
  bars.ctx.fillStyle = 'rgba(255,209,102,0.85)';
  bars.ctx.font = '600 12px Inter, sans-serif';
  bars.ctx.fillText('y = 2πr', bars.sx(R) - 46, bars.sy(2 * Math.PI * R) + 16);

  // axis hints
  bars.ctx.fillStyle = 'rgba(148,163,196,0.8)';
  bars.ctx.font = '11px Inter, sans-serif';
  bars.ctx.textAlign = 'center';
  bars.ctx.fillText('radius r', bars.sx(R / 2), bars.sy(0) + 26);
}

// ---- update everything -------------------------------------------------------
function update(N) {
  N = Math.max(1, Math.round(N));
  nVal.textContent = N;
  nLabel.textContent = N;
  drawCircle(N);
  drawBars(N);
  const a = approxArea(N);
  approxVal.textContent = a.toFixed(4);
  trueVal.textContent = TRUE_AREA.toFixed(4);
  const err = Math.abs(a - TRUE_AREA);
  errVal.textContent = err < 1e-4 ? '≈ 0  🎯' : err.toFixed(4);
}

// ---- animate N -> infinity ---------------------------------------------------
let animing = false;
function animate() {
  if (animing) return;
  animing = true; animBtn.disabled = true; animBtn.textContent = 'adding rings…';
  const start = performance.now(), dur = 2600, from = +nSlider.value, to = 300;
  function frame(now) {
    const p = Math.min(1, (now - start) / dur);
    const ease = 1 - Math.pow(1 - p, 3);
    const N = Math.round(lerp(from, to, ease));
    nSlider.value = N; update(N);
    if (p < 1) requestAnimationFrame(frame);
    else { animing = false; animBtn.disabled = false; animBtn.textContent = '▶ Add rings → ∞'; }
  }
  requestAnimationFrame(frame);
}

// ---- predict-quiz (Brilliant-style active recall) ----------------------------
function wireQuiz() {
  const q = document.getElementById('quiz');
  if (!q) return;
  q.querySelectorAll('button[data-ans]').forEach(btn => {
    btn.addEventListener('click', () => {
      const right = btn.dataset.ans === 'triangle';
      q.querySelectorAll('button[data-ans]').forEach(b => b.disabled = true);
      btn.classList.add(right ? 'correct' : 'wrong');
      const fb = document.getElementById('quizFb');
      fb.style.display = 'block';
      fb.innerHTML = right
        ? '✅ <b>Yes!</b> A right triangle — base R, height 2πR. Scroll on for the magic.'
        : '❌ Not quite — try cranking N up in the lab and look again. (Hint: the top edge is a straight line.)';
    });
  });
}

// ---- boot --------------------------------------------------------------------
nSlider.addEventListener('input', e => update(e.target.value));
animBtn.addEventListener('click', animate);
bars.onResize(() => update(+nSlider.value));
window.addEventListener('resize', () => update(+nSlider.value));
window.addEventListener('load', () => {
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\(', right: '\\)', display: false }
      ]
    });
  }
  wireQuiz();
  update(8);
});
update(8);
