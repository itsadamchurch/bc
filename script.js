document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;

  const levels = [
    { year: 2007, level: 0, game: "Super Mario Galaxy", desc: "The adventure begins — a star is born, ready to explore whole new galaxies." },
    { year: 2008, level: 1, game: "Fallout 3", desc: "First steps into the wasteland — curiosity and courage unlocked." },
    { year: 2009, level: 2, game: "Uncharted 2: Among Thieves", desc: "Climbing higher — discovering treasures in words, play, and imagination." },
    { year: 2010, level: 3, game: "Mass Effect 2", desc: "Squad assembled — friendships and teamwork become the ultimate powers." },
    { year: 2011, level: 4, game: "Portal 2", desc: "Puzzles solved — clever thinking and laughter open new portals." },
    { year: 2012, level: 5, game: "Journey", desc: "A path unfolds — small steps turn into meaningful adventures." },
    { year: 2013, level: 6, game: "The Last of Us", desc: "Bravery tested — learning resilience and the strength of bonds." },
    { year: 2014, level: 7, game: "Dragon Age: Inquisition", desc: "The world expands — choices matter, and quests grow bigger." },
    { year: 2015, level: 8, game: "The Witcher 3: Wild Hunt", desc: "Epic quests unlocked — curiosity leads to wild adventures." },
    { year: 2016, level: 9, game: "Overwatch", desc: "Team spirit shines — every role counts, every victory shared." },
    { year: 2017, level: 10, game: "The Legend of Zelda: Breath of the Wild", desc: "Exploration unlocked — the open world is yours to climb, cook, and conquer." },
    { year: 2018, level: 11, game: "God of War", desc: "Strength and wisdom grow — learning from mentors and forging your own path." },
    { year: 2019, level: 12, game: "Control", desc: "Mysteries deepen — discovering hidden powers and bending the rules." },
    { year: 2020, level: 13, game: "Hades", desc: "Resilience tested — fighting through challenges, stronger each time." },
    { year: 2021, level: 14, game: "Forza Horizon 5", desc: "Full speed ahead — racing into new horizons with style and energy." },
    { year: 2022, level: 15, game: "Elden Ring", desc: "A vast world awaits — courage and persistence unlock hidden victories." },
    { year: 2023, level: 16, game: "The Legend of Zelda: Tears of the Kingdom", desc: "Building higher — creativity and invention take adventures skyward." },
    { year: 2024, level: 17, game: "Metaphor: ReFantazio", desc: "Dreams take shape — imagination transforms into bold new worlds." },
    { year: 2025, level: 18, game: "TBD", desc: "Adulthood unlocked — the next quest is yours to write." }
  ];

  const levelInfo = document.getElementById("level-info");
  const gotyCol = document.getElementById("goty-col");
  const levelImg = document.getElementById("level-img");
  const levelImg8bit = document.getElementById("level-img-8bit");
  const bonus = document.getElementById("bonus");
  const canvas = document.getElementById("confetti");
  const ctx = canvas ? canvas.getContext("2d") : null;

  let pieces = [];
  let animId = null;
  let running = false;

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // === Confetti ===
  function shootConfetti(count = 220) {
    if (!ctx || !canvas) return;
    running = true;
    pieces = [];

    for (let i = 0; i < count; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: 6 + Math.random() * 6,
        color: `hsl(${Math.random() * 360}, 100%, 60%)`,
        vx: Math.random() * 6 - 3,
        vy: Math.random() * 5 + 2,
        g: 0.25 + Math.random() * 0.15,
      });
    }

    function draw() {
      if (!running || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.g;
        if (p.y > canvas.height) p.y = -10;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      animId = requestAnimationFrame(draw);
    }

    draw();

    // Stop after 3 seconds
    setTimeout(() => {
      running = false;
      if (animId) cancelAnimationFrame(animId);
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      setTimeout(() => bonus.classList.add("visible"), 200);
    }, 3000);
  }

  // === Synced Image Loader ===
  function loadBothImages(index) {
    const data = levels[index];
    if (!data) return;

    const paths = [
      { el: levelImg8bit, base: `img/${data.level}` },
      { el: levelImg, base: `img/imgOg/${data.level}` },
    ];

    function getFirstValidSrc(base, cb) {
      const candidates = [`${base}.jpg`, `${base}.JPG`, `${base}.png`];
      let loaded = false;
      (function tryNext(i) {
        if (i >= candidates.length || loaded) return;
        const test = new Image();
        test.onload = () => { loaded = true; cb(candidates[i]); };
        test.onerror = () => tryNext(i + 1);
        test.src = candidates[i];
      })(0);
    }

    let count = 0;
    const total = paths.length;
    const loadedSrcs = {};

    paths.forEach(({ el, base }, i) => {
      getFirstValidSrc(base, (src) => {
        loadedSrcs[i] = src;
        count++;
        if (count === total) {
          paths.forEach(({ el }, j) => el.src = loadedSrcs[j]);
        }
      });
    });
  }

  // === Show Slide ===
  function showSlide(index) {
    const data = levels[index];
    if (!data) return;

    levelInfo.innerHTML = `
      <h3>Level ${data.level} – ${data.year}</h3>
      <p>${data.desc}</p>
    `;

    gotyCol.innerHTML = `
      <h4>Game of the Year</h4>
      <p>${data.year} – ${data.game}</p>
    `;

    loadBothImages(index);

    if (index === 18) {
      bonus.classList.remove("visible");
      shootConfetti();
    } else {
      bonus.classList.remove("visible");
      running = false;
      if (animId) cancelAnimationFrame(animId);
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // === Navigation ===
  document.getElementById("nextBtn").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % levels.length;
    showSlide(currentSlide);
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + levels.length) % levels.length;
    showSlide(currentSlide);
  });

  showSlide(currentSlide);
});
