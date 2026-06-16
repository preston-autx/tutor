# Tutor — Reinventing Calculus from Scratch

An interactive course for going from **Algebra 2 / Trig → AP Calculus**, built on one rule:

> We never *memorize* a formula. We *rebuild* it — so if you forgot it on a desert
> island, you could derive it again with a stick in the sand.

Taught in the spirit of **3Blue1Brown** (visual intuition), **Veritasium** (story &
"why"), and **Brilliant** (learn by doing). One polished, interactive lesson at a time.

## 🚀 Start here
1. **Run the app:**
   ```bash
   cd app && python3 -m http.server 8000
   ```
   Then open **http://localhost:8000** in your browser.
2. **Lesson 1 — The Circle Mystery** is live: discover *why* \(A=\pi r^2\) by slicing a
   circle into rings and watching it become a triangle. Drag the rings. Predict. Reveal.

## 📂 What's here
- `app/` — the interactive lessons (HTML/CSS/JS, no build step).
- `lessons/` — companion notes for each lesson, so the ideas stick after you close the tab.
- `ROADMAP.md` — the full journey, lesson by lesson.

## 🗺️ The big picture
Calculus is two ideas that turn out to be one:
1. **Integration** — add up infinitely many tiny slices (area, total change). *(Lesson 1)*
2. **The Derivative** — zoom in to find the rate of change right now. *(Lesson 2)*
3. **The Fundamental Theorem** — they're inverses. *(Lesson 3)*

Everything else is tools in service of those three. See `ROADMAP.md` for the path.
