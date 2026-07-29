# Wheelie Slugger

A mobile-friendly browser game that combines e-bike wheelies with a baseball theme.

## Play online

[Play Wheelie Slugger](https://bytemaple.github.io/wheelie-slugger/)

## Play

- Hold **W** or **Up Arrow** to accelerate.
- Hold **A** or **Left Arrow** to lean back and lift the front wheel.
- Hold **D** or **Right Arrow** to lean forward and balance.
- Hold **S** or **Down Arrow** to bring the front wheel down.
- Press **X**, **Shift**, or the on-screen **Boost** button when boost is charged.
- Clear cones, gloves, and bats while collecting baseballs and building a score multiplier.

On mobile, the four matching arrow controls appear at the bottom of the game screen.

Leaning has deliberate weight and momentum, so controlled wheelies require timing. Baseballs
collected during rides become spendable in-game currency for purchasing 25 different bikes.
The game stores scores, baseballs, purchased bikes, and sound preferences in the browser. It
can also be installed to a phone's home screen from a supported mobile browser.

## Run locally

No build step or dependencies are required. Start any static web server in this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Hosting

The game is hosted with GitHub Pages and includes a deployment workflow. Future updates to
`main` publish automatically.

## Expansion ideas

- New ballparks, seasons, bikes, riders, and obstacle types
- Missions, daily challenges, and championship events
- Trick combinations and replay clips
- Online leaderboards using an optional backend
- Custom character art, music, and sound effects
