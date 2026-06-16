# Lesson 1 — The Circle Mystery 🟠

> Companion notes to the interactive page `app/index.html`.
> The page is where you *play*; this is where you keep the takeaways.

## The story
You've used \(A = \pi r^2\) your whole life. But *why* is it true? We discover it instead
of memorizing it — and accidentally invent calculus along the way.

## The big move: slice, then add
A disk is a stack of thin **rings** (like tree rings). Understand one ring, understand the disk.

- A ring at radius \(r\) with tiny thickness \(dr\), unrolled, is almost a thin rectangle:
  - length = circumference = \(2\pi r\)
  - height = \(dr\)
  - area \(\approx 2\pi r \, dr\)

Now stand every unrolled ring side by side, shortest (center, length ≈ 0) to longest
(edge, length \(2\pi R\)). They fill a **right triangle**:

    base   = R          (the radii)
    height = 2πR        (biggest circumference)
    area   = ½ · base · height = ½ · R · 2πR = πR²   ✅

## What just happened (the real lesson)
Chopping a shape into infinitely many tiny pieces and summing them is called
**integration**. We computed:

    ∫₀ᴿ 2πr dr = πR²

"Area of the circle" = "area under the line \(y = 2\pi r\)". Tying *adding up tiny slices*
to *area under a curve* is the heartbeat of all of calculus.

## Why the approximation converges (the honest math)
With \(N\) rings of thickness \(\Delta r = R/N\), using each ring's *outer* circumference:

    estimate = Σ_{i=1}^{N} 2π(iΔr)Δr
             = 2πΔr² · (N(N+1)/2)
             = πR² · (N+1)/N
             = πR²(1 + 1/N)

So the overestimate shrinks like \(1/N\): at N=10 it's 10% high, at N=100 it's 1% high,
and as \(N\to\infty\) it nails \(\pi R^2\) exactly. That "let N go to infinity" is a **limit** —
the one genuinely new idea we'll formalize later.

## Takeaways
1. Hard shape → slice into easy pieces → add → take a limit. That's integration.
2. \(\pi r^2\) is just a triangle's area wearing a disguise.
3. The graph \(y=2\pi r\) and the disk share the same area. Curves and accumulation are linked.

**Next:** Lesson 2 flips the question — instead of *adding up* change, we find the rate of
change *at one instant*: the derivative.
