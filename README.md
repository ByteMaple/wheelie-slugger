# Wheelie Slugger

A mobile-friendly browser game that combines e-bike wheelies with a baseball theme.

## Play online

[Play Wheelie Slugger](https://bytemaple.github.io/wheelie-slugger/)

## Play

- The bike auto-forwards by default, and leaning also keeps it moving.
- Press **Space** or **Up Arrow** to jump.
- Hold **W** to accelerate manually when auto-forward is turned off.
- Hold **A** or **Left Arrow** to lean back and lift the front wheel.
- Hold **D** or **Right Arrow** to lean forward and balance.
- Hold **S** or **Down Arrow** to bring the front wheel down.
- Press **X**, **Shift**, or the on-screen **Boost** button when boost is charged.
- Clear cones, gloves, and bats while collecting baseballs and building a score multiplier.
- Launch from MTB hoppers, adjust the bike in the air, and land inside the wheelie balance zone.

On mobile, the four matching arrow controls appear at the bottom of the game screen.
The on-screen up arrow is the jump button.

Leaning has deliberate weight and momentum, so controlled wheelies require timing. Baseballs
collected during rides become spendable in-game currency for purchasing 25 different bikes.
Each more expensive bike has a higher top speed and quicker acceleration. The bikes use an
electric dirt-bike design with off-road tires, battery bodies, long suspension, and motocross
bodywork.
Later innings add pitcher's mounds, tire stacks, and MTB-style hopper ramps. Ramp jumps use
simple airtime physics, and a successful landing must touch down in a controlled wheelie.

The menu includes a challenge that rotates each local calendar day. Challenges include a
timed first-base run with a perfect boost zone, controlled wheelie landings, jumping catcher
tags, and baseball-catching streaks. Select the challenge card to launch a dedicated course
with an on-screen countdown timer. Completing one awards spendable baseballs for new bikes.
The game stores scores, baseballs, purchased bikes, and sound preferences in the browser. It
can also be installed to a phone's home screen from a supported mobile browser.

Settings include auto-forward, sound volume, in-game brightness, phone vibration on supported
devices, visual screen shake, fullscreen, and a saved Battery Saver preference.

Global leaderboards rank registered players by spendable baseball money and longest continuous
wheelie. Run `leaderboard-setup.sql` once in Supabase before opening the leaderboard.

On first launch, every player claims a 3–16 character username. Usernames are checked
case-insensitively against the shared Supabase database, so no two players can claim the same
name.

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
