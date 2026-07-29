(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const canvas = $("#gameCanvas");
  const ctx = canvas.getContext("2d");

  const ui = {
    hud: $("#hud"),
    score: $("#scoreValue"),
    baseballs: $("#baseballValue"),
    distance: $("#distanceValue"),
    inning: $("#inningValue"),
    balancePanel: $("#balancePanel"),
    balanceNeedle: $("#balanceNeedle"),
    combo: $("#comboValue"),
    boostPanel: $("#boostPanel"),
    boostFill: $("#boostFill"),
    challengeTimer: $("#challengeTimerPanel"),
    challengeTimerName: $("#challengeTimerName"),
    challengeTimerValue: $("#challengeTimerValue"),
    challengeTimerGoal: $("#challengeTimerGoal"),
    menu: $("#menuOverlay"),
    result: $("#resultOverlay"),
    pause: $("#pauseOverlay"),
    controls: $("#gameControls"),
    start: $("#startButton"),
    restart: $("#restartButton"),
    resume: $("#resumeButton"),
    home: $("#homeButton"),
    pauseHome: $("#pauseHomeButton"),
    pauseButton: $("#pauseButton"),
    soundButton: $("#soundButton"),
    forwardButton: $("#forwardButton"),
    leanBackButton: $("#leanBackButton"),
    leanForwardButton: $("#leanForwardButton"),
    wheelDownButton: $("#wheelDownButton"),
    boostButton: $("#boostButton"),
    garage: $("#garageDialog"),
    garageButton: $("#garageButton"),
    topGarageButton: $("#topGarageButton"),
    resultGarageButton: $("#resultGarageButton"),
    bikeList: $("#bikeList"),
    menuBest: $("#menuBestScore"),
    menuBaseballs: $("#menuBaseballs"),
    challengeTitle: $("#dailyChallengeTitle"),
    challengeDescription: $("#dailyChallengeDescription"),
    challengeReward: $("#dailyChallengeReward"),
    challengeFill: $("#dailyChallengeFill"),
    challengeProgress: $("#dailyChallengeProgress"),
    challengeCard: $("#dailyChallengeCard"),
    challengeAction: $("#dailyChallengeAction"),
    garageBaseballs: $("#garageBaseballs"),
    resultScore: $("#resultScore"),
    resultDistance: $("#resultDistance"),
    resultBaseballs: $("#resultBaseballs"),
    resultCombo: $("#resultCombo"),
    resultTitle: $("#resultTitle"),
    resultMessage: $("#resultMessage"),
    newBest: $("#newBestLabel"),
    banner: $("#inningBanner"),
    bannerEyebrow: $("#inningBannerEyebrow"),
    bannerTitle: $("#inningBannerTitle"),
    bannerSubtitle: $("#inningBannerSubtitle"),
    toast: $("#toast"),
    live: $("#liveRegion"),
    playerBadge: $("#playerBadge"),
    playerUsername: $("#playerUsername"),
    ownerTag: $("#ownerTag"),
    usernameDialog: $("#usernameDialog"),
    usernameForm: $("#usernameForm"),
    usernameInput: $("#usernameInput"),
    usernameStatus: $("#usernameStatus"),
    usernameSuggestions: $("#usernameSuggestions"),
    claimUsername: $("#claimUsernameButton"),
  };

  const STORAGE_KEY = "wheelie-slugger-save-v1";

  const bikes = [
    {
      id: "rookie",
      name: "Rookie Red",
      description: "A quick starter built for opening day.",
      cost: 0,
      color: "#ff4f5e",
      accent: "#f7fbff",
      icon: "🚲",
    },
    {
      id: "dugout",
      name: "Dugout Blue",
      description: "Cool under pressure with extra boost style.",
      cost: 20,
      color: "#37b7ff",
      accent: "#c7ff45",
      icon: "🚲",
    },
    {
      id: "grand-slam",
      name: "Grand Slam Gold",
      description: "The championship ride for elite sluggers.",
      cost: 60,
      color: "#ffbf2f",
      accent: "#4f2600",
      icon: "🚲",
    },
    {
      id: "pinstripe",
      name: "Pinstripe Pro",
      description: "Classic ballpark style with a clean white frame.",
      cost: 110,
      color: "#f4f7fb",
      accent: "#152a4a",
      icon: "🚲",
    },
    {
      id: "night-game",
      name: "Night Game Neon",
      description: "A bright electric ride made for late innings.",
      cost: 175,
      color: "#a855f7",
      accent: "#c7ff45",
      icon: "🚲",
    },
    {
      id: "hall-of-fame",
      name: "Hall of Fame Chrome",
      description: "The rarest bike in the garage. Built for legends.",
      cost: 300,
      color: "#a9bdc9",
      accent: "#ff7a32",
      icon: "🚲",
    },
    {
      id: "bullpen-black",
      name: "Bullpen Black",
      description: "A stealthy ride that stays ready for the call.",
      cost: 400,
      color: "#1f2937",
      accent: "#f8fafc",
      icon: "🚲",
    },
    {
      id: "curveball-green",
      name: "Curveball Green",
      description: "A sharp green frame with wicked break.",
      cost: 525,
      color: "#22c55e",
      accent: "#052e16",
      icon: "🚲",
    },
    {
      id: "fastball-flame",
      name: "Fastball Flame",
      description: "Bright, fast, and impossible to ignore.",
      cost: 675,
      color: "#ef4444",
      accent: "#fbbf24",
      icon: "🚲",
    },
    {
      id: "catchers-copper",
      name: "Catcher's Copper",
      description: "Tough gear-inspired color built for every inning.",
      cost: 850,
      color: "#b87333",
      accent: "#172554",
      icon: "🚲",
    },
    {
      id: "steal-home-silver",
      name: "Steal Home Silver",
      description: "A quick silver bike made for fearless runs.",
      cost: 1050,
      color: "#cbd5e1",
      accent: "#2563eb",
      icon: "🚲",
    },
    {
      id: "moonshot-purple",
      name: "Moonshot Purple",
      description: "Launch wheelies under a deep purple sky.",
      cost: 1300,
      color: "#7c3aed",
      accent: "#f5d0fe",
      icon: "🚲",
    },
    {
      id: "walk-off-white",
      name: "Walk-Off White",
      description: "Clean, confident, and made for the final play.",
      cost: 1600,
      color: "#f8fafc",
      accent: "#dc2626",
      icon: "🚲",
    },
    {
      id: "extra-innings-teal",
      name: "Extra Innings Teal",
      description: "Keeps its cool when the game goes long.",
      cost: 1950,
      color: "#14b8a6",
      accent: "#082f49",
      icon: "🚲",
    },
    {
      id: "all-star-crimson",
      name: "All-Star Crimson",
      description: "A bold red ride reserved for standout players.",
      cost: 2350,
      color: "#be123c",
      accent: "#fde68a",
      icon: "🚲",
    },
    {
      id: "pennant-pink",
      name: "Pennant Pink",
      description: "A bright victory color for the pennant chase.",
      cost: 2800,
      color: "#ec4899",
      accent: "#fdf2f8",
      icon: "🚲",
    },
    {
      id: "diamond-ice",
      name: "Diamond Ice",
      description: "Cold blue shine with championship confidence.",
      cost: 3350,
      color: "#67e8f9",
      accent: "#164e63",
      icon: "🚲",
    },
    {
      id: "warning-track",
      name: "Warning Track Orange",
      description: "A fiery orange frame that rides to the wall.",
      cost: 4000,
      color: "#f97316",
      accent: "#431407",
      icon: "🚲",
    },
    {
      id: "green-monster",
      name: "Green Monster",
      description: "Big-wall energy in an unmistakable deep green.",
      cost: 4750,
      color: "#15803d",
      accent: "#fef3c7",
      icon: "🚲",
    },
    {
      id: "southpaw-sapphire",
      name: "Southpaw Sapphire",
      description: "A rare blue gem with a different angle.",
      cost: 5600,
      color: "#1d4ed8",
      accent: "#bfdbfe",
      icon: "🚲",
    },
    {
      id: "switch-hitter-lime",
      name: "Switch Hitter Lime",
      description: "Bright lime style that looks good from either side.",
      cost: 6600,
      color: "#84cc16",
      accent: "#1a2e05",
      icon: "🚲",
    },
    {
      id: "perfect-game-pearl",
      name: "Perfect Game Pearl",
      description: "Smooth pearl paint for a flawless performance.",
      cost: 7750,
      color: "#f5f3ff",
      accent: "#6d28d9",
      icon: "🚲",
    },
    {
      id: "triple-crown-ruby",
      name: "Triple Crown Ruby",
      description: "A deep red collector bike with three-star status.",
      cost: 9000,
      color: "#9f1239",
      accent: "#fbbf24",
      icon: "🚲",
    },
    {
      id: "world-series-carbon",
      name: "World Series Carbon",
      description: "Dark carbon styling for championship riders.",
      cost: 10500,
      color: "#111827",
      accent: "#d1d5db",
      icon: "🚲",
    },
    {
      id: "cooperstown-platinum",
      name: "Cooperstown Platinum",
      description: "The ultimate garage prize for a true wheelie legend.",
      cost: 12500,
      color: "#e2e8f0",
      accent: "#c7ff45",
      icon: "🚲",
    },
  ];

  const innings = [
    {
      name: "Spring Training",
      skyTop: "#70cbea",
      skyBottom: "#e9fbff",
      grass: "#258959",
      fence: "#155f4a",
      obstacles: ["cone", "mound"],
    },
    {
      name: "Night Game",
      skyTop: "#172c58",
      skyBottom: "#d86558",
      grass: "#19704a",
      fence: "#104836",
      obstacles: ["cone", "glove", "mound", "ramp"],
    },
    {
      name: "Championship",
      skyTop: "#07152d",
      skyBottom: "#4e3670",
      grass: "#145c3f",
      fence: "#0c3f31",
      obstacles: ["cone", "glove", "bats", "tire-stack", "ramp"],
    },
  ];

  const obstacleTypes = {
    cone: { label: "Cone", requiredAngle: 0.36, width: 38, height: 54, points: 90 },
    glove: { label: "Glove", requiredAngle: 0.54, width: 48, height: 46, points: 130 },
    bats: { label: "Bats", requiredAngle: 0.69, width: 60, height: 53, points: 180 },
    mound: { label: "Pitcher's mound", requiredAngle: 0.31, width: 72, height: 30, points: 110 },
    "tire-stack": {
      label: "Tire stack",
      requiredAngle: 0.78,
      width: 72,
      height: 65,
      points: 240,
    },
    ramp: { label: "MTB hopper", requiredAngle: 0.2, width: 112, height: 58, points: 350 },
    tag: { label: "Catcher tag", requiredAngle: 0, width: 68, height: 45, points: 275 },
  };

  const dailyChallenges = [
    {
      id: "first-base",
      title: "First Base Dash",
      description: "Reach first base at 750 m in 30 seconds. Boost in the gold zone at 600–700 m.",
      goal: 750,
      reward: 450,
      unit: "m",
      seconds: 30,
    },
    {
      id: "wheelie-landings",
      title: "Wheelie Landing",
      description: "Land 3 MTB ramp jumps in the green wheelie zone.",
      goal: 3,
      reward: 550,
      unit: "landings",
      seconds: 75,
    },
    {
      id: "tag-jumps",
      title: "Beat the Tag",
      description: "Jump over 3 catcher tags without crashing.",
      goal: 3,
      reward: 600,
      unit: "tags",
      seconds: 75,
    },
    {
      id: "catch-streak",
      title: "Golden Glove",
      description: "Catch 15 baseballs during your rides.",
      goal: 15,
      reward: 400,
      unit: "catches",
      seconds: 60,
    },
  ];

  function localDateKey() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function challengeForDate(dateKey) {
    const seed = [...dateKey].reduce((total, character) => total + character.charCodeAt(0), 0);
    return dailyChallenges[seed % dailyChallenges.length];
  }

  function readSave() {
    const fallback = {
      bestScore: 0,
      totalBaseballs: 0,
      baseballBalance: 0,
      ownedBikes: ["rookie"],
      selectedBike: "rookie",
      soundOn: false,
      username: null,
      playerId: null,
      playerToken: null,
      dailyChallenge: null,
    };

    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      const saved = { ...fallback, ...stored };
      saved.totalBaseballs = Math.max(0, Number(saved.totalBaseballs) || 0);
      saved.baseballBalance = Number.isFinite(stored.baseballBalance)
        ? Math.max(0, stored.baseballBalance)
        : saved.totalBaseballs;
      saved.ownedBikes = Array.isArray(stored.ownedBikes)
        ? [...new Set(["rookie", ...stored.ownedBikes])]
        : ["rookie"];

      // Preserve a bike that a returning player had selected before purchases were introduced.
      if (stored.selectedBike && stored.selectedBike !== "rookie") {
        saved.ownedBikes.push(stored.selectedBike);
        saved.ownedBikes = [...new Set(saved.ownedBikes)];
      }
      if (!saved.ownedBikes.includes(saved.selectedBike)) saved.selectedBike = "rookie";
      return saved;
    } catch {
      return fallback;
    }
  }

  const save = readSave();

  function ensureDailyChallenge() {
    const date = localDateKey();
    const definition = challengeForDate(date);
    if (!save.dailyChallenge || save.dailyChallenge.date !== date) {
      save.dailyChallenge = {
        date,
        id: definition.id,
        progress: 0,
        completed: false,
      };
      writeSave();
    }
    return dailyChallenges.find((challenge) => challenge.id === save.dailyChallenge.id) || definition;
  }

  function writeSave() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
    } catch {
      // The game remains playable if storage is unavailable.
    }
  }

  class SoundBoard {
    constructor() {
      this.enabled = Boolean(save.soundOn);
      this.context = null;
    }

    ensureContext() {
      if (!this.enabled) return null;
      if (!this.context) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) this.context = new AudioContextClass();
      }
      if (this.context?.state === "suspended") this.context.resume();
      return this.context;
    }

    tone(frequency, duration = 0.08, type = "sine", volume = 0.045, endFrequency = null) {
      const audio = this.ensureContext();
      if (!audio) return;

      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      const now = audio.currentTime;

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now);
      if (endFrequency) {
        oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + duration);
      }
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.start(now);
      oscillator.stop(now + duration);
    }

    noiseBurst(duration, volume, frequency, type = "bandpass") {
      const audio = this.ensureContext();
      if (!audio) return;

      const frameCount = Math.max(1, Math.floor(audio.sampleRate * duration));
      const buffer = audio.createBuffer(1, frameCount, audio.sampleRate);
      const samples = buffer.getChannelData(0);
      for (let index = 0; index < frameCount; index += 1) {
        const fade = 1 - index / frameCount;
        samples[index] = (Math.random() * 2 - 1) * fade * fade;
      }

      const source = audio.createBufferSource();
      const filter = audio.createBiquadFilter();
      const gain = audio.createGain();
      const now = audio.currentTime;
      source.buffer = buffer;
      filter.type = type;
      filter.frequency.setValueAtTime(frequency, now);
      filter.Q.setValueAtTime(type === "bandpass" ? 1.8 : 0.7, now);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(audio.destination);
      source.start(now);
    }

    collect() {
      // A low leather thump and short slap recreate a baseball landing in a glove.
      this.tone(155, 0.11, "sine", 0.11, 82);
      this.noiseBurst(0.075, 0.16, 1150, "bandpass");
      window.setTimeout(() => this.tone(235, 0.055, "triangle", 0.055, 145), 18);
    }

    clear(type) {
      if (type === "bats") {
        // Bright wooden impact followed by the quick snap of a clean hit.
        this.noiseBurst(0.055, 0.24, 3100, "highpass");
        this.tone(185, 0.075, "square", 0.105, 92);
        this.tone(1320, 0.045, "triangle", 0.085, 570);
        window.setTimeout(() => this.noiseBurst(0.09, 0.08, 1750, "bandpass"), 28);
        return;
      }
      this.tone(240, 0.1, "square", 0.025, 410);
    }

    boost() {
      this.tone(125, 0.22, "sawtooth", 0.04, 420);
    }

    crash() {
      this.tone(150, 0.34, "sawtooth", 0.05, 55);
    }

    inning() {
      this.tone(440, 0.1, "triangle", 0.045, 550);
      window.setTimeout(() => this.tone(660, 0.16, "triangle", 0.045, 880), 110);
    }

    toggle() {
      this.enabled = !this.enabled;
      save.soundOn = this.enabled;
      writeSave();
      if (this.enabled) this.tone(520, 0.1, "sine", 0.04, 720);
      updateSoundButton();
    }
  }

  const sounds = new SoundBoard();

  class WheelieGame {
    constructor() {
      this.width = 0;
      this.height = 0;
      this.dpr = 1;
      this.state = "menu";
      this.challengeMode = false;
      this.challengeTimeRemaining = 0;
      this.lastRunWasChallenge = false;
      this.lastTime = performance.now();
      this.demoTime = 0;
      this.controls = {
        forward: false,
        leanBack: false,
        leanForward: false,
        wheelDown: false,
      };
      this.toastTimer = null;
      this.bannerTimer = null;
      this.resize();
      this.reset();
      requestAnimationFrame((time) => this.frame(time));
    }

    resize() {
      const rect = canvas.getBoundingClientRect();
      this.width = Math.max(320, rect.width);
      this.height = Math.max(280, rect.height);
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(this.width * this.dpr);
      canvas.height = Math.round(this.height * this.dpr);
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    reset() {
      this.camera = 0;
      this.speed = 0;
      this.score = 0;
      this.baseballs = 0;
      this.combo = 1;
      this.bestCombo = 1;
      this.balanceTime = 0;
      this.angle = 0.08;
      this.angularVelocity = 0;
      this.boostCharge = 100;
      this.boostTimer = 0;
      this.airborne = false;
      this.airHeight = 0;
      this.airVelocity = 0;
      this.activeJump = null;
      this.runTime = 0;
      this.perfectBoost = false;
      this.boostZonePrompted = false;
      this.dashResolved = false;
      this.currentInning = 1;
      this.nextObstacle = 780;
      this.nextPickup = 470;
      this.obstacles = [];
      this.pickups = [];
      this.particles = [];
      this.clouds = Array.from({ length: 6 }, (_, index) => ({
        x: index * 320 + Math.random() * 120,
        y: 55 + Math.random() * Math.max(45, this.height * 0.22),
        scale: 0.55 + Math.random() * 0.65,
      }));
      this.releaseControls();
      this.seedWorld();
      this.updateUI(true);
    }

    seedWorld() {
      while (this.nextPickup < this.width * 2.2) this.spawnPickup();
      while (this.nextObstacle < this.width * 2.2) this.spawnObstacle();
    }

    start(challengeMode = false) {
      if (!save.username) {
        openUsernameDialog();
        return;
      }
      this.reset();
      this.challengeMode = challengeMode;
      this.lastRunWasChallenge = challengeMode;
      if (challengeMode) {
        const challenge = ensureDailyChallenge();
        this.challengeTimeRemaining = challenge.seconds;
        this.prepareChallengeCourse(challenge);
        ui.challengeTimer.hidden = false;
        ui.challengeTimerName.textContent = challenge.title.toUpperCase();
        ui.challengeTimerGoal.textContent = challenge.description;
        this.updateChallengeTimer();
      } else {
        ui.challengeTimer.hidden = true;
      }
      this.state = "running";
      setOverlay(ui.menu, false);
      setOverlay(ui.result, false);
      setOverlay(ui.pause, false);
      ui.hud.hidden = false;
      ui.balancePanel.hidden = false;
      ui.boostPanel.hidden = false;
      ui.controls.hidden = false;
      ui.pauseButton.hidden = false;
      this.lastTime = performance.now();
      this.announce(
        "Ride started. Press up to move, left to lean back, right to lean forward, and down to lower the wheel.",
      );
      if (sounds.enabled) sounds.ensureContext();
    }

    prepareChallengeCourse(challenge) {
      if (challenge.id === "catch-streak") {
        this.pickups = [];
        this.nextPickup = 300;
        for (let index = 0; index < 22; index += 1) {
          this.pickups.push({
            x: 350 + index * 170,
            minAngle: 0.3 + (index % 4) * 0.1,
            checked: false,
            collected: false,
            phase: index,
          });
        }
        this.nextPickup = 4300;
      }

      if (challenge.id === "wheelie-landings" || challenge.id === "tag-jumps") {
        this.obstacles = [];
        for (let index = 0; index < 5; index += 1) {
          const rampX = 620 + index * 850;
          this.obstacles.push({
            x: rampX,
            type: "ramp",
            checked: false,
            cleared: false,
          });
          this.obstacles.push({
            x: rampX + 155,
            type: "tag",
            checked: false,
            cleared: false,
          });
        }
        this.nextObstacle = 5200;
      }
    }

    pause() {
      if (this.state !== "running") return;
      this.state = "paused";
      this.releaseControls();
      setOverlay(ui.pause, true);
      ui.controls.hidden = true;
      ui.pauseButton.hidden = true;
    }

    resume() {
      if (this.state !== "paused") return;
      this.state = "running";
      setOverlay(ui.pause, false);
      ui.controls.hidden = false;
      ui.pauseButton.hidden = false;
      this.lastTime = performance.now();
    }

    home() {
      this.state = "menu";
      this.releaseControls();
      setOverlay(ui.pause, false);
      setOverlay(ui.result, false);
      setOverlay(ui.menu, true);
      ui.hud.hidden = true;
      ui.balancePanel.hidden = true;
      ui.boostPanel.hidden = true;
      ui.challengeTimer.hidden = true;
      ui.controls.hidden = true;
      ui.pauseButton.hidden = true;
      refreshRecords();
    }

    setControl(action, pressed) {
      if (!(action in this.controls)) return;
      if (pressed && this.state !== "running") return;
      this.controls[action] = pressed;
      const buttons = {
        forward: ui.forwardButton,
        leanBack: ui.leanBackButton,
        leanForward: ui.leanForwardButton,
        wheelDown: ui.wheelDownButton,
      };
      buttons[action]?.classList.toggle("is-held", pressed);
    }

    releaseControls() {
      for (const action of Object.keys(this.controls)) {
        this.setControl(action, false);
      }
    }

    useBoost() {
      if (this.state !== "running" || this.boostCharge < 34 || this.boostTimer > 0) return;
      const challenge = ensureDailyChallenge();
      const distance = this.distanceMeters();
      let hitPerfectBoost = false;
      if (
        challenge.id === "first-base" &&
        this.challengeMode &&
        !save.dailyChallenge.completed &&
        distance >= 600 &&
        distance <= 700
      ) {
        this.perfectBoost = true;
        hitPerfectBoost = true;
        this.showToast("PERFECT BOOST!");
        sounds.inning();
      }
      this.boostCharge -= 34;
      this.boostTimer = 0.9;
      sounds.boost();
      this.burst(this.playerX() - 40, this.groundY() - 20, "#ffb33c", 13, true);
      if (!hitPerfectBoost) this.showToast("Power boost!");
      if (navigator.vibrate) navigator.vibrate(20);
    }

    update(dt) {
      this.demoTime += dt;
      if (this.state !== "running") {
        return;
      }

      this.runTime += dt;
      if (this.challengeMode) {
        this.challengeTimeRemaining = Math.max(0, this.challengeTimeRemaining - dt);
        this.updateChallengeTimer();
        if (this.challengeTimeRemaining <= 0) {
          this.crash("challenge-time");
          return;
        }
      }
      const distanceMeters = this.distanceMeters();
      const bikeLevel = getBikeIndex(save.selectedBike);
      const bikeSpeedBonus = bikeLevel * 5.5;
      const bikeAcceleration = 2.35 + bikeLevel * 0.035;
      const topSpeed =
        225 +
        bikeSpeedBonus +
        Math.min(distanceMeters * 0.12, 105) +
        (this.currentInning - 1) * 16;
      const boostSpeed = this.boostTimer > 0 && this.controls.forward ? 165 : 0;
      if (this.controls.forward) {
        this.speed +=
          (topSpeed + boostSpeed - this.speed) * Math.min(1, dt * bikeAcceleration);
      } else {
        this.speed = Math.max(0, this.speed - 92 * dt);
      }
      this.camera += this.speed * dt;

      if (this.boostTimer > 0) this.boostTimer -= dt;
      this.boostCharge = Math.min(100, this.boostCharge + dt * (this.boostTimer > 0 ? 3 : 9));

      let torque = -0.62 - this.angle * 0.25;
      if (this.controls.leanBack) torque += 2.15;
      if (this.controls.leanForward) torque -= 1.55;
      if (this.controls.wheelDown) torque -= 3.8;
      const stabilityAssist = this.angle > 1.08 ? -0.58 : 0;
      this.angularVelocity += (torque + stabilityAssist) * dt;
      this.angularVelocity *= Math.pow(0.12, dt);
      this.angularVelocity = clamp(this.angularVelocity, -1.45, 1.3);
      this.angle += this.angularVelocity * dt;

      if (this.angle <= 0) {
        this.angle = 0;
        this.angularVelocity = Math.max(0, this.angularVelocity);
      }

      if (this.airborne) {
        this.airHeight += this.airVelocity * dt;
        this.airVelocity -= 610 * dt;
        if (this.airHeight <= 0 && this.airVelocity < 0) {
          this.airHeight = 0;
          this.airVelocity = 0;
          this.airborne = false;
          const landedInWheelie = this.angle >= 0.38 && this.angle <= 1.08;
          if (!landedInWheelie) {
            this.crash("landing");
            return;
          }
          if (this.activeJump) this.activeJump.cleared = true;
          const jumpPoints = obstacleTypes.ramp.points * this.combo;
          this.score += jumpPoints;
          this.burst(this.playerX() + 25, this.groundY() - 10, "#c7ff45", 15, true);
          sounds.clear("landing");
          this.showToast(`WHEELIE LANDING! +${jumpPoints}`);
          advanceDailyChallenge("wheelie-landings");
          this.activeJump = null;
          if (navigator.vibrate) navigator.vibrate(25);
        }
      }

      const inBalanceZone = this.angle >= 0.46 && this.angle <= 0.96;
      if (inBalanceZone) {
        this.balanceTime += dt;
        this.combo = clamp(1 + Math.floor(this.balanceTime / 1.25), 1, 5);
        this.bestCombo = Math.max(this.bestCombo, this.combo);
        this.score += dt * (8 + this.speed * 0.045) * this.combo;
      } else {
        this.balanceTime = Math.max(0, this.balanceTime - dt * 1.5);
        this.combo = clamp(1 + Math.floor(this.balanceTime / 1.25), 1, 5);
      }

      this.score += dt * this.speed * 0.045;

      const dailyChallenge = ensureDailyChallenge();
      if (
        dailyChallenge.id === "first-base" &&
        this.challengeMode &&
        !save.dailyChallenge.completed &&
        !this.boostZonePrompted &&
        distanceMeters >= 600 &&
        distanceMeters <= 700
      ) {
        this.boostZonePrompted = true;
        this.showToast("GOLD ZONE—BOOST NOW!");
      }
      if (
        dailyChallenge.id === "first-base" &&
        this.challengeMode &&
        !save.dailyChallenge.completed &&
        !this.dashResolved &&
        distanceMeters >= dailyChallenge.goal
      ) {
        this.dashResolved = true;
        if (this.runTime <= 30 && this.perfectBoost) {
          completeDailyChallenge();
        } else {
          this.showToast(
            this.runTime > 30 ? "SAFE—but too slow. Try again!" : "Boost in the gold zone!",
          );
        }
      }

      if (this.angle > 1.43) {
        this.crash("loopout");
        return;
      }

      const nextInning = Math.floor(distanceMeters / 500) + 1;
      if (nextInning > this.currentInning) {
        this.currentInning = nextInning;
        this.score += 500 * this.currentInning;
        this.showInning();
      }

      this.fillWorld();
      this.checkObjects();
      this.updateParticles(dt);
      this.cleanWorld();
      this.updateUI();
    }

    fillWorld() {
      const ahead = this.camera + this.width * 2;
      while (this.nextPickup < ahead) this.spawnPickup();
      while (this.nextObstacle < ahead) this.spawnObstacle();
    }

    spawnPickup() {
      const difficulty = Math.min(1, (this.currentInning - 1) * 0.2);
      const minAngle = 0.28 + Math.random() * (0.42 + difficulty * 0.18);
      this.pickups.push({
        x: this.nextPickup,
        minAngle,
        checked: false,
        collected: false,
        phase: Math.random() * Math.PI * 2,
      });
      this.nextPickup += 245 + Math.random() * 230;
    }

    spawnObstacle() {
      const inning = innings[(this.currentInning - 1) % innings.length];
      const available = inning.obstacles;
      const type = available[Math.floor(Math.random() * available.length)];
      this.obstacles.push({
        x: this.nextObstacle,
        type,
        checked: false,
        cleared: false,
      });
      if (type === "ramp") {
        this.obstacles.push({
          x: this.nextObstacle + 155,
          type: "tag",
          checked: false,
          cleared: false,
        });
      }
      const spacing = Math.max(470, 780 - this.currentInning * 28);
      this.nextObstacle += spacing + Math.random() * 390;
    }

    checkObjects() {
      const bikeLevel = getBikeIndex(save.selectedBike);
      const frontWheelOffset = bikeLevel >= 12 ? 99 : 94;
      const checkX = this.camera + this.playerX() + frontWheelOffset;

      for (const pickup of this.pickups) {
        if (pickup.checked || checkX < pickup.x) continue;
        pickup.checked = true;
        if (this.angle >= pickup.minAngle - 0.16 && this.angle <= 1.3) {
          pickup.collected = true;
          this.baseballs += 1;
          save.totalBaseballs += 1;
          save.baseballBalance += 1;
          writeSave();
          this.score += 120 * this.combo;
          sounds.collect();
          advanceDailyChallenge("catch-streak");
          this.burst(
            pickup.x - this.camera,
            this.pickupY(pickup),
            "#ffffff",
            9,
            false,
          );
          this.showToast(this.baseballs % 5 === 0 ? "Run scored! +500" : `Catch! ×${this.combo}`);
          if (this.baseballs % 5 === 0) {
            this.score += 500;
            sounds.inning();
          }
        }
      }

      for (const obstacle of this.obstacles) {
        if (obstacle.checked || checkX < obstacle.x) continue;
        obstacle.checked = true;
        const data = obstacleTypes[obstacle.type];

        if (obstacle.type === "tag") {
          if (!this.airborne) {
            this.crash("tag");
            return;
          }
          obstacle.cleared = true;
          this.score += data.points * this.combo;
          sounds.collect();
          this.burst(obstacle.x - this.camera, this.groundY() - 26, "#ffbf2f", 12, true);
          this.showToast(`TAG JUMP! +${data.points * this.combo}`);
          advanceDailyChallenge("tag-jumps");
          continue;
        }

        if (obstacle.type === "ramp") {
          if (this.airborne || this.speed < 115 || this.angle < data.requiredAngle) {
            this.crash("ramp");
            return;
          }
          this.airborne = true;
          this.airHeight = 4;
          this.airVelocity = 255 + Math.min(65, this.speed * 0.12);
          this.activeJump = obstacle;
          this.angularVelocity += 0.18;
          sounds.boost();
          this.showToast("AIR! LAND IN A WHEELIE");
          this.announce("Jump! Use left and right to land in a wheelie.");
          continue;
        }

        if (this.airborne) {
          obstacle.cleared = true;
          this.score += data.points * this.combo;
          continue;
        }

        if (this.angle < data.requiredAngle) {
          this.crash(obstacle.type);
          return;
        }

        obstacle.cleared = true;
        this.score += data.points * this.combo;
        sounds.clear(obstacle.type);
        this.burst(obstacle.x - this.camera, this.groundY() - data.height / 2, "#c7ff45", 7);
        this.showToast(`${data.label} cleared! +${data.points * this.combo}`);
      }
    }

    cleanWorld() {
      const behind = this.camera - 160;
      this.pickups = this.pickups.filter((item) => item.x > behind);
      this.obstacles = this.obstacles.filter((item) => item.x > behind);
    }

    crash(reason) {
      if (this.state !== "running") return;
      this.state = "crashed";
      this.releaseControls();
      sounds.crash();
      if (navigator.vibrate) navigator.vibrate([45, 35, 90]);
      this.burst(this.playerX() + 40, this.groundY() - 28, "#ff7a32", 24, true);

      const finalScore = Math.floor(this.score);
      const isNewBest = finalScore > save.bestScore;
      if (isNewBest) save.bestScore = finalScore;
      writeSave();

      const messages = {
        loopout: {
          title: "Too far back!",
          message: "Release a little earlier to keep the bike in the green balance zone.",
        },
        cone: {
          title: "Cone collision!",
          message: "Lift the front wheel before the cone reaches your bike.",
        },
        glove: {
          title: "Glove down!",
          message: "The glove needs a higher wheelie. Hold a little longer next time.",
        },
        bats: {
          title: "Bats in the lane!",
          message: "That stack needs a big, controlled wheelie to clear it.",
        },
        mound: {
          title: "Mound collision!",
          message: "Pop the front wheel before reaching the pitcher's mound.",
        },
        "tire-stack": {
          title: "Tires in the lane!",
          message: "The tire stack needs your highest controlled wheelie.",
        },
        ramp: {
          title: "Missed the hopper!",
          message: "Build speed and lift the front wheel as you reach the MTB ramp.",
        },
        landing: {
          title: "Hard landing!",
          message: "Use left and right in the air, then land inside the green wheelie zone.",
        },
        tag: {
          title: "Tagged out!",
          message: "Launch from the ramp and stay airborne over the catcher's tag.",
        },
        "challenge-time": {
          title: "Time's up!",
          message: "Restart the daily challenge and try to beat the clock.",
        },
      };

      const result = messages[reason] || messages.cone;
      ui.resultTitle.textContent = result.title;
      ui.resultMessage.textContent = result.message;
      ui.resultScore.textContent = formatNumber(finalScore);
      ui.resultDistance.textContent = formatNumber(this.distanceMeters());
      ui.resultBaseballs.textContent = this.baseballs;
      ui.resultCombo.textContent = `×${this.bestCombo}`;
      ui.newBest.hidden = !isNewBest;

      ui.controls.hidden = true;
      ui.pauseButton.hidden = true;
      ui.challengeTimer.hidden = true;
      window.setTimeout(() => setOverlay(ui.result, true), 420);
      this.announce(`${result.title} Final score ${finalScore}.`);
    }

    updateParticles(dt) {
      for (const particle of this.particles) {
        particle.life -= dt;
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.vy += 220 * dt;
        particle.rotation += particle.spin * dt;
      }
      this.particles = this.particles.filter((particle) => particle.life > 0);
    }

    burst(x, y, color, count, sparks = false) {
      for (let index = 0; index < count; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = (sparks ? 95 : 58) + Math.random() * (sparks ? 150 : 100);
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 35,
          life: 0.42 + Math.random() * 0.55,
          maxLife: 1,
          size: 2 + Math.random() * (sparks ? 6 : 4),
          color,
          rotation: Math.random() * Math.PI,
          spin: -5 + Math.random() * 10,
        });
      }
    }

    showToast(message) {
      clearTimeout(this.toastTimer);
      ui.toast.textContent = message;
      ui.toast.hidden = false;
      ui.toast.style.animation = "none";
      void ui.toast.offsetWidth;
      ui.toast.style.animation = "";
      this.toastTimer = window.setTimeout(() => {
        ui.toast.hidden = true;
      }, 900);
    }

    showInning() {
      const inning = innings[(this.currentInning - 1) % innings.length];
      ui.bannerEyebrow.textContent =
        this.currentInning <= 3 ? "NEXT UP" : "EXTRA INNINGS";
      ui.bannerTitle.textContent = `INNING ${this.currentInning}`;
      ui.bannerSubtitle.textContent = inning.name;
      ui.banner.hidden = false;
      ui.banner.style.animation = "none";
      void ui.banner.offsetWidth;
      ui.banner.style.animation = "";
      clearTimeout(this.bannerTimer);
      this.bannerTimer = window.setTimeout(() => {
        ui.banner.hidden = true;
      }, 2400);
      sounds.inning();
      this.announce(`Inning ${this.currentInning}: ${inning.name}`);
    }

    updateUI(force = false) {
      if (this.state !== "running" && !force) return;
      ui.score.textContent = formatNumber(Math.floor(this.score));
      ui.baseballs.textContent = this.baseballs;
      ui.distance.textContent = formatNumber(this.distanceMeters());
      ui.inning.textContent = this.currentInning;
      ui.combo.textContent = `×${this.combo}`;

      const normalizedAngle = clamp(this.angle / 1.43, 0, 1);
      ui.balanceNeedle.style.left = `${normalizedAngle * 100}%`;
      ui.boostFill.style.transform = `scaleX(${this.boostCharge / 100})`;
      ui.boostButton.disabled = this.boostCharge < 34 || this.boostTimer > 0;
    }

    updateChallengeTimer() {
      if (!this.challengeMode) return;
      const seconds = Math.max(0, this.challengeTimeRemaining);
      const minutes = Math.floor(seconds / 60);
      const remainder = Math.ceil(seconds % 60);
      ui.challengeTimerValue.textContent = `${minutes}:${String(remainder).padStart(2, "0")}`;
      ui.challengeTimer.classList.toggle("is-urgent", seconds <= 10);
    }

    distanceMeters() {
      return Math.floor(this.camera / 10);
    }

    groundY() {
      return Math.floor(this.height * (this.width < 640 ? 0.68 : 0.76));
    }

    playerX() {
      return clamp(this.width * 0.22, 105, 250);
    }

    pickupY(pickup) {
      const wheelLift = Math.sin(pickup.minAngle) * 92;
      return this.groundY() - 30 - wheelLift - Math.sin(this.demoTime * 5 + pickup.phase) * 5;
    }

    announce(message) {
      ui.live.textContent = "";
      window.setTimeout(() => {
        ui.live.textContent = message;
      }, 20);
    }

    frame(time) {
      const dt = Math.min(0.034, Math.max(0, (time - this.lastTime) / 1000));
      this.lastTime = time;
      this.update(dt);
      this.draw();
      requestAnimationFrame((nextTime) => this.frame(nextTime));
    }

    draw() {
      ctx.save();
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      ctx.clearRect(0, 0, this.width, this.height);
      this.drawBackground();
      this.drawObjects();
      this.drawBike();
      this.drawParticles();
      this.drawSpeedLines();
      ctx.restore();
    }

    drawBackground() {
      const inning = innings[(this.currentInning - 1) % innings.length];
      const gradient = ctx.createLinearGradient(0, 0, 0, this.groundY());
      gradient.addColorStop(0, inning.skyTop);
      gradient.addColorStop(1, inning.skyBottom);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.width, this.groundY());

      if ((this.currentInning - 1) % innings.length >= 1) {
        this.drawStars();
      } else {
        this.drawSun();
      }

      this.drawClouds();
      this.drawStadiumLights();

      const fenceTop = this.groundY() - 88;
      ctx.fillStyle = inning.fence;
      ctx.fillRect(0, fenceTop, this.width, 88);

      ctx.strokeStyle = "rgba(255,255,255,.18)";
      ctx.lineWidth = 1;
      const fenceOffset = -((this.camera * 0.28) % 34);
      for (let x = fenceOffset; x < this.width + 34; x += 34) {
        ctx.beginPath();
        ctx.moveTo(x, fenceTop);
        ctx.lineTo(x + 34, this.groundY());
        ctx.moveTo(x + 34, fenceTop);
        ctx.lineTo(x, this.groundY());
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(255,255,255,.9)";
      ctx.fillRect(0, fenceTop, this.width, 5);

      this.drawScoreboard(fenceTop);

      ctx.fillStyle = inning.grass;
      ctx.fillRect(0, this.groundY(), this.width, this.height - this.groundY());

      const stripeWidth = 150;
      const stripeOffset = -((this.camera * 0.64) % (stripeWidth * 2));
      ctx.fillStyle = "rgba(255,255,255,.045)";
      for (let x = stripeOffset; x < this.width + stripeWidth; x += stripeWidth * 2) {
        ctx.fillRect(x, this.groundY(), stripeWidth, this.height - this.groundY());
      }

      ctx.fillStyle = "#b98350";
      ctx.fillRect(0, this.groundY() - 3, this.width, 33);
      ctx.fillStyle = "#dba974";
      ctx.fillRect(0, this.groundY() - 3, this.width, 6);

      ctx.strokeStyle = "rgba(255,255,255,.9)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, this.groundY() + 31);
      ctx.lineTo(this.width, this.groundY() + 31);
      ctx.stroke();

      const chalkOffset = -((this.camera * 0.95) % 110);
      ctx.fillStyle = "rgba(255,255,255,.55)";
      for (let x = chalkOffset; x < this.width + 110; x += 110) {
        ctx.fillRect(x, this.groundY() + 29, 44, 4);
      }
    }

    drawSun() {
      const x = this.width * 0.78;
      const y = this.height * 0.17;
      const glow = ctx.createRadialGradient(x, y, 2, x, y, 70);
      glow.addColorStop(0, "rgba(255,246,163,.95)");
      glow.addColorStop(0.3, "rgba(255,225,91,.5)");
      glow.addColorStop(1, "rgba(255,225,91,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff0a2";
      ctx.beginPath();
      ctx.arc(x, y, 27, 0, Math.PI * 2);
      ctx.fill();
    }

    drawStars() {
      ctx.fillStyle = "rgba(255,255,255,.75)";
      for (let index = 0; index < 30; index += 1) {
        const x = (index * 97 + 31) % this.width;
        const y = (index * 43 + 18) % Math.max(80, this.groundY() - 120);
        const radius = index % 7 === 0 ? 1.5 : 0.8;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    drawClouds() {
      const isNight = (this.currentInning - 1) % innings.length >= 1;
      ctx.fillStyle = isNight ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.44)";
      for (const cloud of this.clouds) {
        const x = ((cloud.x - this.camera * 0.05) % (this.width + 260)) - 80;
        const y = cloud.y;
        const scale = cloud.scale;
        ctx.beginPath();
        ctx.arc(x, y, 26 * scale, Math.PI, 0);
        ctx.arc(x + 30 * scale, y - 10 * scale, 32 * scale, Math.PI, 0);
        ctx.arc(x + 65 * scale, y, 24 * scale, Math.PI, 0);
        ctx.lineTo(x + 65 * scale, y + 10 * scale);
        ctx.lineTo(x, y + 10 * scale);
        ctx.closePath();
        ctx.fill();
      }
    }

    drawStadiumLights() {
      const baseY = this.groundY() - 88;
      const spacing = Math.max(360, this.width * 0.55);
      const offset = -((this.camera * 0.17) % spacing);

      for (let x = offset; x < this.width + spacing; x += spacing) {
        ctx.strokeStyle = "rgba(7,17,31,.5)";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(x, baseY + 4);
        ctx.lineTo(x, Math.max(72, baseY - 210));
        ctx.stroke();

        const lightY = Math.max(65, baseY - 215);
        ctx.fillStyle = "#14233a";
        roundRect(ctx, x - 52, lightY, 104, 42, 7);
        ctx.fill();

        ctx.fillStyle = "rgba(255,248,195,.94)";
        for (let row = 0; row < 2; row += 1) {
          for (let col = 0; col < 5; col += 1) {
            ctx.beginPath();
            ctx.arc(x - 38 + col * 19, lightY + 12 + row * 17, 5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    drawScoreboard(fenceTop) {
      const loop = Math.max(1400, this.width * 2.1);
      let x = this.width - ((this.camera * 0.2 + 180) % loop);
      if (x < -250) x += loop;
      const y = fenceTop - 78;

      ctx.fillStyle = "#08253a";
      roundRect(ctx, x, y, 220, 94, 9);
      ctx.fill();
      ctx.strokeStyle = "#d9f2ff";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#c7ff45";
      ctx.font = "900 13px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("WHEELIE FIELD", x + 110, y + 24);

      ctx.fillStyle = "#ffffff";
      ctx.font = "800 10px system-ui, sans-serif";
      ctx.fillText("RUNS", x + 50, y + 48);
      ctx.fillText("INNING", x + 110, y + 48);
      ctx.fillText("BEST", x + 171, y + 48);

      ctx.fillStyle = "#ffbd48";
      ctx.font = "900 21px ui-monospace, monospace";
      ctx.fillText(String(Math.floor(this.baseballs / 5)), x + 50, y + 75);
      ctx.fillText(String(this.currentInning), x + 110, y + 75);
      ctx.fillText(shortNumber(save.bestScore), x + 171, y + 75);
      ctx.textAlign = "start";
    }

    drawObjects() {
      for (const pickup of this.pickups) {
        if (pickup.collected) continue;
        const x = pickup.x - this.camera;
        if (x < -50 || x > this.width + 50) continue;
        this.drawBaseball(x, this.pickupY(pickup), 13);
      }

      for (const obstacle of this.obstacles) {
        if (obstacle.cleared) continue;
        const x = obstacle.x - this.camera;
        if (x < -80 || x > this.width + 80) continue;
        this.drawObstacle(x, obstacle.type);
      }
    }

    drawBaseball(x, y, radius) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(this.demoTime * 2.5);
      ctx.shadowColor = "rgba(255,255,255,.72)";
      ctx.shadowBlur = 14;
      ctx.fillStyle = "#fffdf4";
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "#d64d4d";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(-7, 0, 8, -1.1, 1.1);
      ctx.arc(7, 0, 8, 2.05, 4.2);
      ctx.stroke();
      ctx.restore();
    }

    drawObstacle(x, type) {
      const y = this.groundY();
      ctx.save();
      ctx.translate(x, y);

      if (type === "cone") {
        ctx.fillStyle = "rgba(0,0,0,.16)";
        ctx.beginPath();
        ctx.ellipse(0, 4, 28, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ff6a2a";
        ctx.beginPath();
        ctx.moveTo(-19, 0);
        ctx.lineTo(0, -51);
        ctx.lineTo(19, 0);
        ctx.closePath();
        ctx.fill();
        ctx.fillRect(-27, -3, 54, 8);
        ctx.fillStyle = "#fff8df";
        ctx.beginPath();
        ctx.moveTo(-11, -19);
        ctx.lineTo(-7, -30);
        ctx.lineTo(7, -30);
        ctx.lineTo(11, -19);
        ctx.closePath();
        ctx.fill();
      } else if (type === "glove") {
        ctx.fillStyle = "rgba(0,0,0,.17)";
        ctx.beginPath();
        ctx.ellipse(0, 3, 29, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.rotate(-0.2);
        ctx.fillStyle = "#a95d2b";
        roundRect(ctx, -24, -36, 48, 37, 13);
        ctx.fill();
        for (let finger = 0; finger < 4; finger += 1) {
          roundRect(ctx, -20 + finger * 11, -48 - (finger % 2) * 3, 10, 25, 6);
          ctx.fill();
        }
        ctx.strokeStyle = "#f0b477";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(1, -19, 14, 0.1, Math.PI - 0.1);
        ctx.stroke();
      } else if (type === "bats") {
        ctx.fillStyle = "rgba(0,0,0,.17)";
        ctx.beginPath();
        ctx.ellipse(0, 3, 34, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        const colors = ["#dfaa61", "#f2c885", "#b97d3f"];
        [-0.32, 0, 0.34].forEach((rotation, index) => {
          ctx.save();
          ctx.rotate(rotation);
          ctx.fillStyle = colors[index];
          roundRect(ctx, -5, -54, 10, 52, 5);
          ctx.fill();
          ctx.fillStyle = "#222c38";
          ctx.fillRect(-6, -9, 12, 7);
          ctx.restore();
        });
      } else if (type === "mound") {
        ctx.fillStyle = "rgba(0,0,0,.16)";
        ctx.beginPath();
        ctx.ellipse(0, 3, 44, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#b97b44";
        ctx.beginPath();
        ctx.moveTo(-43, 0);
        ctx.quadraticCurveTo(-26, -29, 0, -27);
        ctx.quadraticCurveTo(28, -27, 43, 0);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#f7f1df";
        roundRect(ctx, -13, -31, 26, 6, 3);
        ctx.fill();
      } else if (type === "tire-stack") {
        ctx.fillStyle = "rgba(0,0,0,.2)";
        ctx.beginPath();
        ctx.ellipse(0, 5, 45, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        const tires = [
          [-23, -17],
          [23, -17],
          [0, -48],
        ];
        for (const [tireX, tireY] of tires) {
          ctx.fillStyle = "#0a1017";
          ctx.beginPath();
          ctx.arc(tireX, tireY, 23, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#3b4a58";
          ctx.lineWidth = 4;
          ctx.stroke();
          ctx.fillStyle = "#172532";
          ctx.beginPath();
          ctx.arc(tireX, tireY, 9, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === "ramp") {
        ctx.fillStyle = "rgba(0,0,0,.2)";
        ctx.beginPath();
        ctx.ellipse(3, 4, 67, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        const rampGradient = ctx.createLinearGradient(-58, 0, 50, -58);
        rampGradient.addColorStop(0, "#875528");
        rampGradient.addColorStop(1, "#d99a4b");
        ctx.fillStyle = rampGradient;
        ctx.beginPath();
        ctx.moveTo(-59, 0);
        ctx.lineTo(52, -58);
        ctx.lineTo(58, 0);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#f1c27d";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(-56, -3);
        ctx.lineTo(53, -61);
        ctx.stroke();
      } else if (type === "tag") {
        ctx.fillStyle = "rgba(0,0,0,.2)";
        ctx.beginPath();
        ctx.ellipse(0, 4, 39, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#f7f4e8";
        ctx.beginPath();
        ctx.moveTo(-30, -2);
        ctx.lineTo(0, -31);
        ctx.lineTo(30, -2);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#d5d0c3";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.save();
        ctx.translate(8, -25);
        ctx.rotate(-0.35);
        ctx.fillStyle = "#a95d2b";
        roundRect(ctx, -20, -21, 40, 28, 11);
        ctx.fill();
        for (let finger = 0; finger < 4; finger += 1) {
          roundRect(ctx, -17 + finger * 9, -29 - (finger % 2) * 2, 8, 16, 5);
          ctx.fill();
        }
        ctx.restore();
      }

      ctx.restore();
    }

    drawBike() {
      const x = this.playerX();
      const isCrashed = this.state === "crashed";
      const displayAngle =
        this.state === "menu"
          ? 0.48 + Math.sin(this.demoTime * 1.5) * 0.08
          : this.angle + (isCrashed ? Math.min(0.5, (performance.now() - this.lastTime) * 0.0002) : 0);
      const bike = bikes.find((item) => item.id === save.selectedBike) || bikes[0];
      const bikeLevel = getBikeIndex(bike.id);
      const factoryBuild = bikeLevel >= 12;
      const wheelBase = factoryBuild ? 104 : 99;
      const wheelRadius = factoryBuild ? 26 : 24;
      const y = this.groundY() - wheelRadius + 1 - this.airHeight;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-displayAngle);

      const wheelRotation = this.camera * 0.06;
      this.drawWheel(0, 0, wheelRotation, wheelRadius, bike.accent);
      this.drawWheel(wheelBase, 0, wheelRotation, wheelRadius, bike.accent);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Long swingarm and reinforced electric dirt-bike chassis.
      ctx.strokeStyle = "#182330";
      ctx.lineWidth = factoryBuild ? 9 : 8;
      ctx.beginPath();
      ctx.moveTo(3, -3);
      ctx.lineTo(48, -25);
      ctx.lineTo(68, -12);
      ctx.stroke();

      // Large battery and motor body.
      ctx.fillStyle = bike.color;
      ctx.beginPath();
      ctx.moveTo(32, -52);
      ctx.lineTo(67, -49);
      ctx.lineTo(76, -31);
      ctx.lineTo(63, -10);
      ctx.lineTo(35, -18);
      ctx.lineTo(25, -37);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#101b27";
      ctx.beginPath();
      ctx.arc(58, -14, factoryBuild ? 14 : 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = bike.accent;
      ctx.beginPath();
      ctx.arc(58, -14, 6, 0, Math.PI * 2);
      ctx.fill();

      // Inverted front fork and high motocross handlebar.
      ctx.strokeStyle = bike.accent;
      ctx.lineWidth = factoryBuild ? 7 : 6;
      ctx.beginPath();
      ctx.moveTo(73, -46);
      ctx.lineTo(wheelBase - 2, -3);
      ctx.stroke();

      ctx.strokeStyle = "#162432";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(71, -45);
      ctx.lineTo(82, -58);
      ctx.lineTo(96, -58);
      ctx.stroke();

      // Flat dirt-bike seat with rear and front fenders.
      ctx.fillStyle = "#121c27";
      roundRect(ctx, 27, -60, factoryBuild ? 50 : 45, 11, 5);
      ctx.fill();
      ctx.fillStyle = bike.color;
      ctx.beginPath();
      ctx.moveTo(29, -57);
      ctx.lineTo(-8, -49);
      ctx.lineTo(2, -42);
      ctx.lineTo(38, -50);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(wheelBase - 17, -24);
      ctx.quadraticCurveTo(wheelBase + 3, -34, wheelBase + 22, -25);
      ctx.lineTo(wheelBase + 17, -18);
      ctx.quadraticCurveTo(wheelBase, -25, wheelBase - 17, -17);
      ctx.closePath();
      ctx.fill();

      // Rear shock and battery detail.
      ctx.strokeStyle = "#f8fafc";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(35, -48);
      ctx.lineTo(53, -23);
      ctx.stroke();
      ctx.fillStyle = "rgba(8, 18, 30, .35)";
      roundRect(ctx, 37, -44, 25, 19, 4);
      ctx.fill();

      this.drawRider(bike);

      if (this.boostTimer > 0 && this.state === "running") {
        const flame = 14 + Math.random() * 15;
        ctx.fillStyle = "#fff1a6";
        ctx.beginPath();
        ctx.moveTo(-7, -28);
        ctx.lineTo(-flame - 7, -34);
        ctx.lineTo(-8, -39);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#ff6a2a";
        ctx.beginPath();
        ctx.moveTo(-4, -29);
        ctx.lineTo(-flame, -34);
        ctx.lineTo(-5, -37);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    }

    drawWheel(x, y, rotation, radius = 24, accent = "#d8e5ec") {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Knobby off-road tread.
      ctx.fillStyle = "#080d12";
      for (let knob = 0; knob < 12; knob += 1) {
        ctx.save();
        ctx.rotate((Math.PI * 2 * knob) / 12);
        roundRect(ctx, radius - 2, -4, 8, 8, 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.fillStyle = "#0d141c";
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = accent;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, radius - 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(216,229,236,.65)";
      ctx.lineWidth = 1;
      for (let spoke = 0; spoke < 10; spoke += 1) {
        ctx.rotate(Math.PI / 5);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius - 8, 0);
        ctx.stroke();
      }
      ctx.fillStyle = "#8193a1";
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    drawRider(bike) {
      ctx.strokeStyle = "#142231";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(50, -67);
      ctx.lineTo(37, -44);
      ctx.lineTo(56, -21);
      ctx.moveTo(53, -65);
      ctx.lineTo(76, -48);
      ctx.stroke();

      ctx.fillStyle = bike.accent;
      ctx.beginPath();
      ctx.moveTo(42, -86);
      ctx.quadraticCurveTo(58, -94, 68, -80);
      ctx.lineTo(57, -57);
      ctx.lineTo(37, -68);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = bike.color;
      ctx.font = "900 12px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("9", 51, -70);
      ctx.textAlign = "start";

      ctx.fillStyle = "#d79a73";
      ctx.beginPath();
      ctx.arc(50, -100, 11, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = bike.color;
      ctx.beginPath();
      ctx.arc(49, -103, 15, Math.PI, Math.PI * 2);
      ctx.lineTo(65, -98);
      ctx.lineTo(39, -98);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = bike.accent;
      ctx.fillRect(44, -116, 16, 4);
    }

    drawParticles() {
      for (const particle of this.particles) {
        ctx.save();
        ctx.globalAlpha = clamp(particle.life / 0.5, 0, 1);
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
      }
    }

    drawSpeedLines() {
      if (this.boostTimer <= 0 || this.state !== "running") return;
      ctx.strokeStyle = "rgba(255,255,255,.42)";
      ctx.lineWidth = 2;
      for (let index = 0; index < 12; index += 1) {
        const y = 30 + ((index * 67 + this.demoTime * 310) % Math.max(80, this.groundY() - 40));
        const x = (index * 127 + this.demoTime * 520) % (this.width + 180);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 55 - (index % 3) * 25, y);
        ctx.stroke();
      }
    }
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getBikeIndex(bikeId) {
    const index = bikes.findIndex((bike) => bike.id === bikeId);
    return index < 0 ? 0 : index;
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("en-US").format(value);
  }

  function shortNumber(value) {
    if (value >= 1000) return `${Math.floor(value / 100) / 10}K`;
    return String(value);
  }

  function roundRect(context, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + width, y, x + width, y + height, r);
    context.arcTo(x + width, y + height, x, y + height, r);
    context.arcTo(x, y + height, x, y, r);
    context.arcTo(x, y, x + width, y, r);
    context.closePath();
  }

  function setOverlay(element, visible) {
    if (visible) {
      element.hidden = false;
      requestAnimationFrame(() => element.classList.add("overlay--visible"));
    } else {
      element.classList.remove("overlay--visible");
      window.setTimeout(() => {
        if (!element.classList.contains("overlay--visible")) element.hidden = true;
      }, 190);
    }
  }

  function updateSoundButton() {
    const icon = sounds.enabled ? "🔊" : "🔇";
    ui.soundButton.querySelector("span").textContent = icon;
    ui.soundButton.setAttribute("aria-label", sounds.enabled ? "Turn sound off" : "Turn sound on");
  }

  function refreshRecords() {
    ui.menuBest.textContent = formatNumber(save.bestScore);
    ui.menuBaseballs.textContent = formatNumber(save.totalBaseballs);
    ui.garageBaseballs.textContent = formatNumber(save.baseballBalance);
    renderDailyChallenge();
    renderGarage();
  }

  function renderDailyChallenge() {
    const challenge = ensureDailyChallenge();
    const progress = save.dailyChallenge.completed
      ? challenge.goal
      : Math.min(challenge.goal, save.dailyChallenge.progress || 0);
    ui.challengeTitle.textContent = challenge.title;
    ui.challengeDescription.textContent = challenge.description;
    ui.challengeReward.textContent = formatNumber(challenge.reward);
    ui.challengeFill.style.width = `${(progress / challenge.goal) * 100}%`;
    ui.challengeProgress.textContent = save.dailyChallenge.completed
      ? "COMPLETED · REWARD CLAIMED"
      : challenge.id === "first-base"
        ? "Not completed yet"
        : `${progress} / ${challenge.goal} ${challenge.unit}`;
    ui.challengeProgress.classList.toggle("is-complete", save.dailyChallenge.completed);
    ui.challengeAction.textContent = save.dailyChallenge.completed
      ? "COME BACK TOMORROW"
      : `PLAY NOW · ${challenge.seconds}s →`;
    ui.challengeCard.classList.toggle("is-complete", save.dailyChallenge.completed);
  }

  function advanceDailyChallenge(challengeId) {
    const challenge = ensureDailyChallenge();
    if (!game.challengeMode || challenge.id !== challengeId || save.dailyChallenge.completed) return;
    save.dailyChallenge.progress = Math.min(
      challenge.goal,
      (save.dailyChallenge.progress || 0) + 1,
    );
    if (save.dailyChallenge.progress >= challenge.goal) {
      completeDailyChallenge();
    } else {
      writeSave();
      renderDailyChallenge();
    }
  }

  function completeDailyChallenge() {
    const challenge = ensureDailyChallenge();
    if (save.dailyChallenge.completed) return;
    save.dailyChallenge.completed = true;
    save.dailyChallenge.progress = challenge.goal;
    save.baseballBalance += challenge.reward;
    save.totalBaseballs += challenge.reward;
    writeSave();
    refreshRecords();
    game.challengeMode = false;
    ui.challengeTimer.hidden = true;
    sounds.inning();
    game.showToast(`DAILY COMPLETE! +⚾ ${challenge.reward}`);
    game.announce(`Daily challenge complete. You earned ${challenge.reward} baseballs.`);
  }

  function refreshPlayerIdentity() {
    const hasUsername = Boolean(save.username);
    const isOwner = save.username?.toLowerCase() === "henry";
    ui.playerBadge.hidden = !hasUsername;
    ui.start.disabled = !hasUsername;
    ui.playerUsername.textContent = hasUsername ? save.username : "";
    ui.ownerTag.hidden = !isOwner;
    ui.playerBadge.classList.toggle("player-badge--owner", isOwner);
  }

  function openUsernameDialog() {
    if (!ui.usernameDialog.open) ui.usernameDialog.showModal();
    window.setTimeout(() => ui.usernameInput.focus(), 50);
  }

  function normalizeUsername(value) {
    return value.trim();
  }

  function validateUsername(username) {
    if (username.length < 3 || username.length > 16) {
      return "Use between 3 and 16 characters.";
    }
    if (!/^[A-Za-z0-9_]+$/.test(username)) {
      return "Use only letters, numbers, and underscores.";
    }
    return "";
  }

  function showUsernameSuggestions(username) {
    const base = username.replace(/[^A-Za-z0-9_]/g, "").slice(0, 12) || "Rider";
    const suggestions = Array.from(
      { length: 3 },
      () => `${base}${Math.floor(10 + Math.random() * 9999)}`.slice(0, 16),
    );
    ui.usernameSuggestions.innerHTML = "<span>Try one of these:</span>";
    for (const suggestion of suggestions) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `@${suggestion}`;
      button.addEventListener("click", () => {
        ui.usernameInput.value = suggestion;
        ui.usernameInput.focus();
        ui.usernameStatus.textContent = "";
      });
      ui.usernameSuggestions.appendChild(button);
    }
    ui.usernameSuggestions.hidden = false;
  }

  async function claimUsername(event) {
    event.preventDefault();
    const username = normalizeUsername(ui.usernameInput.value);
    const validationMessage = validateUsername(username);
    ui.usernameSuggestions.hidden = true;
    if (validationMessage) {
      ui.usernameStatus.textContent = validationMessage;
      ui.usernameStatus.dataset.state = "error";
      return;
    }

    const config = window.WHEELIE_CONFIG;
    if (!config?.supabaseUrl || !config?.supabasePublishableKey) {
      ui.usernameStatus.textContent = "Username service is not configured yet.";
      ui.usernameStatus.dataset.state = "error";
      return;
    }

    ui.claimUsername.disabled = true;
    ui.claimUsername.textContent = "Checking…";
    ui.usernameStatus.textContent = "Checking availability…";
    ui.usernameStatus.dataset.state = "loading";

    try {
      const response = await fetch(`${config.supabaseUrl}/rest/v1/rpc/reserve_username`, {
        method: "POST",
        headers: {
          apikey: config.supabasePublishableKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ requested_username: username }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.message || `Request failed (${response.status})`);

      if (!result?.ok) {
        const messages = {
          taken: `@${username} is already taken.`,
          length: "Use between 3 and 16 characters.",
          format: "Use only letters, numbers, and underscores.",
        };
        ui.usernameStatus.textContent = messages[result?.error] || "That name cannot be used.";
        ui.usernameStatus.dataset.state = "error";
        if (result?.error === "taken") showUsernameSuggestions(username);
        return;
      }

      save.username = result.username;
      save.playerId = result.playerId;
      save.playerToken = result.playerToken;
      writeSave();
      refreshPlayerIdentity();
      ui.usernameStatus.textContent = `@${save.username} is yours!`;
      ui.usernameStatus.dataset.state = "success";
      window.setTimeout(() => ui.usernameDialog.close(), 450);
      game.announce(`Welcome to Wheelie Slugger, ${save.username}.`);
    } catch (error) {
      console.error("Username reservation failed:", error);
      ui.usernameStatus.textContent = "Could not connect. Check your internet and try again.";
      ui.usernameStatus.dataset.state = "error";
    } finally {
      ui.claimUsername.disabled = false;
      ui.claimUsername.textContent = "Claim player name";
    }
  }

  function renderGarage() {
    ui.bikeList.innerHTML = "";
    for (const [bikeIndex, bike] of bikes.entries()) {
      const owned = save.ownedBikes.includes(bike.id);
      const canAfford = save.baseballBalance >= bike.cost;
      const selected = save.selectedBike === bike.id;
      const speedRating = 100 + bikeIndex * 5;
      const card = document.createElement("article");
      card.className = `bike-card${selected ? " is-selected" : ""}`;
      card.innerHTML = `
        <div class="bike-swatch" style="color:${bike.color}; box-shadow:inset 0 -3px 0 ${bike.color}22">
          🏍️
        </div>
        <h3>${bike.name}</h3>
        <p>${bike.description}</p>
        <div class="bike-performance" aria-label="Speed rating ${speedRating}">
          <span>Speed</span>
          <div><i style="width:${((bikeIndex + 1) / bikes.length) * 100}%"></i></div>
          <strong>${speedRating}</strong>
        </div>
        <button type="button" data-bike="${bike.id}" ${owned || canAfford ? "" : "disabled"}>
          ${
            selected
              ? "Selected"
              : owned
                ? "Choose bike"
                : canAfford
                  ? `Buy · ⚾ ${bike.cost}`
                  : `Need ⚾ ${bike.cost}`
          }
        </button>
      `;
      ui.bikeList.appendChild(card);
    }
  }

  const game = new WheelieGame();
  let resumeAfterGarage = false;

  refreshPlayerIdentity();
  ui.usernameForm.addEventListener("submit", claimUsername);
  ui.usernameDialog.addEventListener("cancel", (event) => {
    if (!save.username) event.preventDefault();
  });
  if (!save.username) window.setTimeout(openUsernameDialog, 0);

  function startDailyChallenge() {
    const challenge = ensureDailyChallenge();
    if (save.dailyChallenge.completed) {
      game.showToast("Today's challenge is already complete!");
      return;
    }
    game.start(true);
    game.announce(`${challenge.title} started. You have ${challenge.seconds} seconds.`);
  }

  ui.start.addEventListener("click", () => game.start());
  ui.restart.addEventListener("click", () =>
    game.start(game.lastRunWasChallenge && !save.dailyChallenge.completed),
  );
  ui.challengeCard.addEventListener("click", startDailyChallenge);
  ui.challengeCard.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      startDailyChallenge();
    }
  });
  ui.resume.addEventListener("click", () => game.resume());
  ui.home.addEventListener("click", () => game.home());
  ui.pauseHome.addEventListener("click", () => game.home());
  ui.pauseButton.addEventListener("click", () => game.pause());
  ui.soundButton.addEventListener("click", () => sounds.toggle());

  function openGarage() {
    resumeAfterGarage = game.state === "running";
    if (resumeAfterGarage) game.pause();
    refreshRecords();
    ui.garage.showModal();
  }

  ui.garageButton.addEventListener("click", openGarage);
  ui.topGarageButton.addEventListener("click", openGarage);
  ui.resultGarageButton.addEventListener("click", openGarage);
  ui.garage.addEventListener("close", () => {
    if (resumeAfterGarage && game.state === "paused") game.resume();
    resumeAfterGarage = false;
  });
  ui.bikeList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-bike]");
    if (!button || button.disabled) return;
    const bike = bikes.find((item) => item.id === button.dataset.bike);
    if (!bike) return;

    const owned = save.ownedBikes.includes(bike.id);
    if (!owned) {
      if (save.baseballBalance < bike.cost) return;
      save.baseballBalance -= bike.cost;
      save.ownedBikes.push(bike.id);
      game.announce(`${bike.name} purchased for ${bike.cost} baseballs.`);
    }

    save.selectedBike = bike.id;
    writeSave();
    refreshRecords();
  });

  const controlButtons = {
    forward: ui.forwardButton,
    leanBack: ui.leanBackButton,
    leanForward: ui.leanForwardButton,
    wheelDown: ui.wheelDownButton,
  };

  for (const [action, button] of Object.entries(controlButtons)) {
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      game.setControl(action, true);
      button.setPointerCapture?.(event.pointerId);
    });
    const release = (event) => {
      event.preventDefault();
      game.setControl(action, false);
    };
    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("lostpointercapture", () => game.setControl(action, false));
  }

  ui.boostButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    game.useBoost();
  });

  const keyActions = {
    KeyW: "forward",
    ArrowUp: "forward",
    KeyA: "leanBack",
    ArrowLeft: "leanBack",
    KeyD: "leanForward",
    ArrowRight: "leanForward",
    KeyS: "wheelDown",
    ArrowDown: "wheelDown",
  };

  document.addEventListener("keydown", (event) => {
    const action = keyActions[event.code];
    if (action) {
      event.preventDefault();
      if (!event.repeat) game.setControl(action, true);
    }
    if (["KeyX", "ShiftLeft", "ShiftRight"].includes(event.code)) {
      event.preventDefault();
      if (!event.repeat) game.useBoost();
    }
    if (event.code === "Escape" || event.code === "KeyP") {
      if (game.state === "running") game.pause();
      else if (game.state === "paused") game.resume();
    }
  });

  document.addEventListener("keyup", (event) => {
    const action = keyActions[event.code];
    if (action) {
      event.preventDefault();
      game.setControl(action, false);
    }
  });

  window.addEventListener("blur", () => {
    if (game.state === "running") game.pause();
  });
  window.addEventListener("resize", () => game.resize());
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && game.state === "running") game.pause();
  });

  updateSoundButton();
  refreshRecords();

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {
        // Offline support is optional; the game still works without it.
      });
    });
  }
})();
