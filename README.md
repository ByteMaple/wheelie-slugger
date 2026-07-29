# Wheelie Slugger

A mobile-friendly browser game that combines e-bike wheelies with a baseball theme.

## Play

- Hold **W** or **Up Arrow** to accelerate.
- Hold **A** or **Left Arrow** to lean back and lift the front wheel.
- Hold **D** or **Right Arrow** to lean forward and balance.
- Hold **S** or **Down Arrow** to bring the front wheel down.
- Press **X**, **Shift**, or the on-screen **Boost** button when boost is charged.
- Clear cones, gloves, and bats while collecting baseballs and building a score multiplier.

On mobile, the four matching arrow controls appear at the bottom of the game screen.

The game stores best scores, career baseballs, sound preferences, and unlocked bikes in the
browser. It can also be installed to a phone's home screen from a supported mobile browser.

## Run locally

No build step or dependencies are required. Start any static web server in this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Hosting

The game is designed for GitHub Pages and includes a deployment workflow. In the repository,
choose **Settings → Pages → Source → GitHub Actions** once. Future updates to `main` will
publish automatically.

## Expansion ideas

- New ballparks, seasons, bikes, riders, and obstacle types
- Missions, daily challenges, and championship events
- Trick combinations and replay clips
- Online leaderboards using an optional backend
- Custom character art, music, and sound effects
