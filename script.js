document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;

const levels = [
  { year: 2007, level: 0, game: "Super Mario Galaxy", game_cover: "https://cdn.mobygames.com/covers/8944974-super-mario-galaxy-wii-front-cover.jpg", desc: "The adventure begins — a star is born, ready to explore whole new galaxies." },
  { year: 2008, level: 1, game: "Fallout 3", game_cover: "https://art.gametdb.com/ps3/coverHQ/US/BLUS30185.jpg", desc: "First steps into the wasteland — curiosity and courage unlocked." },
  { year: 2009, level: 2, game: "Uncharted 2: Among Thieves", game_cover: "https://art.gametdb.com/ps3/coverHQ/US/BCUS98123.jpg", desc: "Climbing higher — discovering treasures in words, play, and imagination." },
  { year: 2010, level: 3, game: "Mass Effect 2", game_cover: "https://art.gametdb.com/ps3/coverHQ2/EN/BLES01133.jpg", desc: "Squad assembled — friendships and teamwork become the ultimate powers." },
  { year: 2011, level: 4, game: "Portal 2", game_cover: "https://cdn.mobygames.com/covers/6636214-portal-2-playstation-3-front-cover.jpg", desc: "Puzzles solved — clever thinking and laughter open new portals." },
  { year: 2012, level: 5, game: "Journey", game_cover: "https://art.gametdb.com/ps3/coverHQ/US/BCUS98377.jpg", desc: "A path unfolds — small steps turn into meaningful adventures." },
  { year: 2013, level: 6, game: "The Last of Us", game_cover: "https://cdn.mobygames.com/covers/6777884-the-last-of-us-playstation-3-front-cover.jpg", desc: "Bravery tested — learning resilience and the strength of bonds." },
  { year: 2014, level: 7, game: "Dragon Age: Inquisition", game_cover: "https://art.gametdb.com/ps3/coverHQ/US/BLUS31515.jpg", desc: "The world expands — choices matter, and quests grow bigger." },
  { year: 2015, level: 8, game: "The Witcher 3: Wild Hunt", game_cover: "https://art.gametdb.com/switch/coverHQ/EN/AURVC.jpg", desc: "Epic quests unlocked — curiosity leads to wild adventures." },
  { year: 2016, level: 9, game: "Overwatch", game_cover: "https://cdn.mobygames.com/covers/847314-overwatch-windows-front-cover.jpg", desc: "Team spirit shines — every role counts, every victory shared." },
  { year: 2017, level: 10, game: "The Legend of Zelda: Breath of the Wild", game_cover: "https://cdn.mobygames.com/covers/2122878-the-legend-of-zelda-breath-of-the-wild-wii-u-front-cover.png", desc: "Exploration unlocked — the open world is yours to climb, cook, and conquer." },
  { year: 2018, level: 11, game: "God of War", game_cover: "https://cdn.mobygames.com/covers/10147644-god-of-war-playstation-4-front-cover.jpg", desc: "Strength and wisdom grow — learning from mentors and forging your own path." },
  { year: 2019, level: 12, game: "Control", game_cover: "https://cdn.mobygames.com/covers/847810-control-windows-front-cover.jpg", desc: "Mysteries deepen — discovering hidden powers and bending the rules." },
  { year: 2020, level: 13, game: "Hades", game_cover: "https://cdn.mobygames.com/covers/916216-hades-nintendo-switch-front-cover.jpg", desc: "Resilience tested — fighting through challenges, stronger each time." },
  { year: 2021, level: 14, game: "Forza Horizon 5", game_cover: "https://cdn.mobygames.com/covers/10973763-forza-horizon-5-xbox-series-x-front-cover.jpg", desc: "Full speed ahead — racing into new horizons with style and energy." },
  { year: 2022, level: 15, game: "Elden Ring", game_cover: "https://cdn.mobygames.com/covers/11661233-elden-ring-playstation-4-front-cover.jpg", desc: "A vast world awaits — courage and persistence unlock hidden victories." },
  { year: 2023, level: 16, game: "The Legend of Zelda: Tears of the Kingdom", game_cover: "https://cdn.mobygames.com/covers/12099369-the-legend-of-zelda-tears-of-the-kingdom-switch-front-cover.jpg", desc: "Building higher — creativity and invention take adventures skyward." },
  { year: 2024, level: 17, game: "Metaphor: ReFantazio", game_cover: "https://cdn.mobygames.com/covers/12500000-metaphor-refantazio-playstation-5-front-cover.jpg", desc: "Dreams take shape — imagination transforms into bold new worlds." },
  { year: 2025, level: 18, game: "TBD", game_cover: "", desc: "Adulthood unlocked — the next quest is yours to write." }
];

  const levelInfo = document.getElementById('level-info');
  const gotyCol = document.getElementById('goty-col');
  const levelImg = document.getElementById('level-img');
  const levelImg8bit = document.getElementById('level-img-8bit');
  const timeline = document.getElementById('timeline');

  function renderTimeline(current) {
    timeline.innerHTML = "";
    for (let i = 0; i < levels.length; i++) {
      const icon = document.createElement("img");
      icon.src = i <= current ? "img/icon_on.png" : "img/icon_off.png";
      icon.alt = `Level ${i}`;
      icon.style.width = "24px";
      icon.style.height = "24px";
      icon.style.imageRendering = "pixelated";
      timeline.appendChild(icon);
    }
  }

  function showSlide(index) {
    const data = levels[index];
    if (!data || !levelInfo) return;

    levelInfo.innerHTML = `
      <h3>Level ${data.level} – ${data.year}</h3>
      <p>${data.desc}</p>
    `;

    gotyCol.innerHTML = `
      <h4>Game of the Year</h4>
      ${data.game_cover ? `<img src="${data.game_cover}" alt="${data.game}" style="max-width:100%; margin-bottom:0.5rem;">` : ""}
      <p>${data.year} – ${data.game}</p>
    `;

    const base = `img/imgOg/${data.level}`;
    const base8bit = `img/${data.level}`;

    levelImg8bit.onerror = () => {
      if (!levelImg8bit.src.endsWith(".png")) {
        levelImg8bit.src = `${base8bit}.png`;
      }
    };
    levelImg8bit.src = `${base8bit}.jpg`;
    levelImg8bit.alt = `Level ${data.level} image`;

    levelImg.onerror = () => {
      if (!levelImg.src.endsWith(".png")) {
        levelImg.src = `${base}.png`;
      }
    };
    levelImg.src = `${base}.jpg`;
    levelImg.alt = `Level ${data.level} image`;

    renderTimeline(index);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % levels.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + levels.length) % levels.length;
    showSlide(currentSlide);
  }

  // Hook up buttons safely
  document.getElementById("nextBtn").addEventListener("click", nextSlide);
  document.getElementById("prevBtn").addEventListener("click", prevSlide);

  // Initialize after DOM is ready
  showSlide(currentSlide);
});
