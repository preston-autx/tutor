# 🗺️ The Roadmap — Calculus, Reinvented

The whole journey, **one interactive lesson at a time**. We follow the spine of
3Blue1Brown's *Essence of Calculus*, open every lesson with a Veritasium-style
"why should I care" story, learn by *doing* (Brilliant-style), and **never memorize a
formula we haven't first rebuilt ourselves.**

Each lesson is its own polished, interactive page. We go deep on one, then move on.

**Order of learning matters here:** we build *intuition first* and save the formal,
rigorous stuff (epsilon-delta limits) for *after* you already feel it — exactly how
3b1b sequences it, and the opposite of how most textbooks fail you.

Legend:  ✅ done · 🔜 next · ⬜ planned

---

## Part I — The Two Big Ideas
*Goal: feel what calculus even is before any rules.*

- ✅ **Lesson 1 — The Circle Mystery**
  *Hook:* you've used \(A=\pi r^2\) forever — but why is it true?
  *You reinvent:* integration, by slicing a disk into rings and adding them up.
  *Interactive:* drag the number of rings, watch them unroll into a triangle and the area lock onto \(\pi R^2\).

- 🔜 **Lesson 2 — The Paradox of the Derivative**
  *Hook:* how fast is a car going at a *single instant*, when speed needs two moments?
  *You reinvent:* the derivative, by shrinking a measuring window to nothing.
  *Interactive:* drag a point along a curve, collapse the secant line into the tangent, read the slope live.

- ⬜ **Lesson 3 — The Bridge (Fundamental Theorem of Calculus)**
  *Hook:* the two ideas above look unrelated. They're secretly the same idea backwards.
  *You reinvent:* why "adding up slices" undoes "finding the slope."
  *Interactive:* a moving point whose accumulated area *is* the height of the other graph.

## Part II — The Derivative Toolkit
*Goal: rebuild every differentiation rule from a picture, not a table.*

- ⬜ **Lesson 4 — Power Rule by Geometry** — why \(x^n \to n x^{n-1}\), seen as growing squares & cubes.
- ⬜ **Lesson 5 — Product & Chain Rule, Visually** — areas of rectangles, and "nudges of nudges."
- ⬜ **Lesson 6 — \(e^x\) and the Magic Number** — why one exponential is its own derivative.
- ⬜ **Lesson 7 — Trig Derivatives from the Unit Circle** — *see* why \(\sin' = \cos\).

## Part III — Putting Derivatives to Work
*Goal: the AP application problems, made obvious.*

- ⬜ **Lesson 8 — Implicit Differentiation & Related Rates** — ladders sliding, balloons inflating.
- ⬜ **Lesson 9 — Optimization** — the calculus of "best": biggest box, cheapest can, shortest path.
- ⬜ **Lesson 10 — Shape of a Graph** — higher derivatives, concavity, and reading curves at a glance.

## Part IV — The Integral Toolkit
*Goal: now make the rigor click, then compute real things.*

- ⬜ **Lesson 11 — Limits, Done Right** — the formal "sneaking up," continuity, and L'Hôpital's shortcut.
- ⬜ **Lesson 12 — Antiderivatives & u-Substitution** — running the derivative rules backwards.
- ⬜ **Lesson 13 — Area, Volume & Accumulation** — solids of revolution, total change, average value.

## Part V — The Payoff
*Goal: the "whoa" results that make it all worth it.*

- ⬜ **Lesson 14 — Taylor Series** — approximating *any* function with polynomials. The most beautiful idea in AP.
- ⬜ **Lesson 15 — A Taste of Differential Equations** — equations whose answer is a function (BC).

---

### How we'll work
- You learn Lesson *n*; meanwhile I build Lesson *n+1* in depth — frontend, visuals, interactivity, all of it.
- Every lesson ships as a standalone page in `app/` plus a notes file in `lessons/`.
- You tell me when you're ready for the next one. No rushing, no half-built pages.

### Running the lessons
```bash
cd app && python3 -m http.server 8000
# then open http://localhost:8000  in your browser
```
