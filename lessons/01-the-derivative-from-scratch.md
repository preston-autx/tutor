# Lesson 1 — The Derivative, Reinvented

## The question Algebra cannot answer

A car's position after `t` seconds is `s(t) = t²` meters.
**How fast is it going at *exactly* t = 3 seconds?**

You already know average speed: distance ÷ time = rise ÷ run.
But "speed at a single instant" means run = 0, and rise = 0, so speed = 0/0. Undefined.
That 0/0 is the locked door. Calculus is the key.

## The trick: don't ask at the instant — sneak up on it

Measure the average speed over a tiny window from `t = 3` to `t = 3 + h`:

    avg speed = [s(3+h) - s(3)] / h
              = [(3+h)² - 3²] / h
              = [9 + 6h + h² - 9] / h
              = [6h + h²] / h
              = 6 + h

Now watch what happens as the window `h` shrinks toward 0:

    h = 1     -> 7
    h = 0.1   -> 6.1
    h = 0.01  -> 6.01
    h = 0.001 -> 6.001
                 ...
    h -> 0    -> 6     (the instantaneous speed)

We never divided by zero. We *simplified first*, THEN let h vanish. The answer is **6 m/s**.
That sneaking-up process is called a **limit**.

## Do it for a general t (this DERIVES the formula)

    avg speed = [(t+h)² - t²] / h
              = [t² + 2th + h² - t²] / h
              = [2th + h²] / h
              = 2t + h
    h -> 0    => 2t

So the rate of change of `t²` is `2t`. We didn't look it up — we built it.
This is the **derivative**, written `d/dt [t²] = 2t`.

## What it MEANS geometrically
- Two points on a curve define a **secant** line (slope = rise/run = average rate).
- Slide the second point toward the first. The secant pivots and settles onto the
  **tangent** line — the line that just kisses the curve at that point.
- Zoom way into any smooth curve and it looks straight. The derivative is the slope
  of that straight-looking zoom. The curve's steepness *right there*.

## The pattern (the Power Rule, derived not declared)
- `x²` → `2x`
- `x³` → expand `(x+h)³ = x³ + 3x²h + 3xh² + h³`; subtract x³, divide by h → `3x² + 3xh + h²`; let h→0 → `3x²`
- General: `xⁿ → n·xⁿ⁻¹`

Why? In `(x+h)ⁿ`, the only term with a single `h` is `n·xⁿ⁻¹·h`. Divide by h → `n·xⁿ⁻¹`.
Every other term has `h²` or higher and dies when h→0. That's the whole rule.

## The definition, in one line
    f'(x) = lim(h→0) [ f(x+h) - f(x) ] / h
This is just "average rate over a window, then shrink the window to nothing."
Memorize the *idea* (slope of the shrinking secant) and the formula writes itself.
