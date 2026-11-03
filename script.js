// ==========================================
// ✏️ EDIT THESE (Configurations)
// ==========================================
const NAME = "Chanarrah Lovely";
const PASSWORDS = ["10312005", "31102005"]; // Oct 31, 2005 (MMDDYYYY or DDMMYYYY)
const LETTER = [
  "Belated Happy Birthday Chaaa! ",
  "Dapat kato paning 31 HAHAHA moree sungog to come.",
  "Humana ra imong exam kay badminton na pud ta HAHAHA. bitaw chaaa padayon ra simong pag tuon, maka pressure sa? kita bitaw namo imong paningkamot Cha, Padayon ra gyud.",
  "Ka kita pud ang Ginoo nimo Cha, Praying sa studies nimo Cha. God Bless and Goodluck! Take care cha, kay imo na gi himong diet ang Engineering raba😁"
];
const SIGNED = "— ☺️";

// 📷 Put your pictures in a "photos" folder next to this file and list them here
const PHOTOS = [
  { src: "1.jpg", caption: "" },
  { src: "2.jpg", caption: "" },
  { src: "3.jpg", caption: "" },
  { src: "4.jpg", caption: ""}
];

// 🎵 Put your song in a "music" folder next to this file and set its name here
const MUSIC = "music/song.mp3";

// Pickleball quiz flow
const QUIZ = {
  q1: { t: "Mag pa pickle ball ka?", yes: "win", no: "q2" },
  q2: { t: "Sure ka na gud sa imong desisyon?", yes: "q3", no: "q1" },
  q3: { t: "Wala na gyud may ma ka usab sa imong huna huna?", yes: "q4", no: "q1" },
  q4: { t: "Mag pa pickle ball gyud ka wala na lain option 🏓", yes: "win", only: true }
};

// ==========================================
// 🛠️ Helpers & Elements
// ==========================================
const $ = (id) => document.getElementById(id);

// ==========================================
// 🎵 Media Controls (Video & Background Music)
// ==========================================
const bdayVideo = $('bdayVideo');
const audio = $('music');
const mbtn = $('musicBtn');
let musicOK = true;

audio.src = MUSIC;
audio.volume = 0.6;
audio.onerror = () => {
  musicOK = false;
  // If no audio file but video exists, keep mbtn visible for video
  if (!bdayVideo) mbtn.hidden = true;
};

const updateMediaUI = () => {
  const isPlaying = (bdayVideo && !bdayVideo.paused) || (audio && !audio.paused);
  mbtn.classList.toggle('on', isPlaying);
};

if (bdayVideo) {
  bdayVideo.loop = true;
  bdayVideo.addEventListener('play', updateMediaUI);
  bdayVideo.addEventListener('pause', updateMediaUI);
  bdayVideo.addEventListener('ended', () => {
    bdayVideo.currentTime = 0;
    bdayVideo.play().catch(() => {});
  });
  // Click directly on video to toggle play/pause
  bdayVideo.addEventListener('click', (e) => {
    const rect = bdayVideo.getBoundingClientRect();
    if (e.clientY < rect.bottom - 45) {
      bdayVideo.paused ? bdayVideo.play().catch(() => {}) : bdayVideo.pause();
    }
  });
}

audio.addEventListener('play', updateMediaUI);
audio.addEventListener('pause', updateMediaUI);

mbtn.onclick = () => {
  if (bdayVideo) {
    bdayVideo.paused ? bdayVideo.play().catch(() => {}) : bdayVideo.pause();
  } else if (audio && musicOK) {
    audio.paused ? audio.play().catch(() => {}) : audio.pause();
  }
};

function startVideo() {
  if (!bdayVideo) return;
  bdayVideo.loop = true;
  mbtn.hidden = false;
  const playPromise = bdayVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // If browser blocks unmuted autoplay, mute first, then unmute on first tap
      bdayVideo.muted = true;
      bdayVideo.play().catch(() => {});
      const unmute = () => {
        bdayVideo.muted = false;
        window.removeEventListener('click', unmute);
        window.removeEventListener('touchstart', unmute);
      };
      window.addEventListener('click', unmute, { once: true });
      window.addEventListener('touchstart', unmute, { once: true });
    });
  }
}

function startMusic() {
  if (musicOK) mbtn.hidden = false;
  audio.play().catch(() => {});
}

// ==========================================
// 🎨 Background Canvas Animation (Cakes, Cookies, Bears)
// ==========================================
const cv = $('bg');
const ctx = cv.getContext('2d');
let W, H, DPR, items = [];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const rnd = (a, b) => a + Math.random() * (b - a);
const TYPES = ['cake', 'cookie', 'bear', 'cookie', 'cake', 'bear'];

const circ = (x, y, r, c) => {
  ctx.fillStyle = c;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 6.283);
  ctx.fill();
};

const rr = (x, y, w, h, r) => {
  ctx.beginPath();
  ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h);
  ctx.fill();
};

const DRAW = {
  cake() {
    ctx.fillStyle = '#ffd1b3'; rr(-22, -2, 44, 22, 5);
    ctx.fillStyle = '#ff9ec7'; rr(-22, 7, 44, 5, 2);
    ctx.fillStyle = '#fff';    rr(-25, -12, 50, 14, 7);
    for (const x of [-16, -6, 6, 16]) circ(x, 3, 4, '#fff');
    ctx.fillStyle = '#8ec5ff'; rr(-1.5, -26, 3, 14, 1);
    circ(0, -29, 3, '#ffcf4d');
    circ(-12, -13, 3, '#ff6f9c');
    circ(12, -13, 3, '#ff6f9c');
  },
  cookie() {
    circ(0, 0, 17, '#d9a066');
    ctx.strokeStyle = '#c28445'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, 14, 0, 6.283); ctx.stroke();
    for (const [x, y] of [[-6, -6], [6, -3], [-3, 6], [7, 8], [-9, 3], [2, -10]]) {
      circ(x, y, 2.4, '#5a3320');
    }
  },
  bear() {
    circ(-14, -12, 7, '#a8724a'); circ(14, -12, 7, '#a8724a');
    circ(-14, -12, 3.5, '#f7b6c8'); circ(14, -12, 3.5, '#f7b6c8');
    circ(0, 0, 19, '#b9825a');
    ctx.fillStyle = '#f0d2b0';
    ctx.beginPath(); ctx.ellipse(0, 7, 9, 7, 0, 0, 6.283); ctx.fill();
    circ(-7, -3, 2.2, '#3b2417'); circ(7, -3, 2.2, '#3b2417');
    circ(0, 4, 2.4, '#3b2417');
    circ(-12, 3, 3, 'rgba(255,120,150,.45)'); circ(12, 3, 3, 'rgba(255,120,150,.45)');
    ctx.fillStyle = '#ff7eb6';
    ctx.beginPath(); ctx.moveTo(-9, -16); ctx.lineTo(9, -16); ctx.lineTo(0, -38); ctx.closePath(); ctx.fill();
    circ(0, -38, 3, '#ffd45e');
  }
};

function newItem(init) {
  return {
    t: TYPES[Math.random() * TYPES.length | 0],
    x: init ? rnd(0, W) : -70,
    y: rnd(40, H - 40),
    s: rnd(0.8, 1.7),
    vx: rnd(0.3, 0.8),
    ph: rnd(0, 6.28),
    sw: rnd(0.01, 0.02)
  };
}

function resize() {
  DPR = Math.min(devicePixelRatio || 1, 2);
  W = innerWidth;
  H = innerHeight;
  cv.width = W * DPR;
  cv.height = H * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  items = Array.from({ length: W < 700 ? 14 : 26 }, () => newItem(true));
}

function frame() {
  ctx.clearRect(0, 0, W, H);
  for (const it of items) {
    it.x += it.vx;
    it.ph += it.sw;
    it.y += Math.sin(it.ph) * 0.5;
    if (it.x > W + 70) Object.assign(it, newItem(false));
    ctx.save();
    ctx.translate(it.x, it.y);
    ctx.rotate(Math.sin(it.ph) * 0.35);
    ctx.scale(it.s, it.s);
    ctx.globalAlpha = 0.92;
    DRAW[it.t]();
    ctx.restore();
  }
  if (!reduce) requestAnimationFrame(frame);
}

addEventListener('resize', resize);
resize();
frame();

// ==========================================
// 🔒 Step 1: Login Verification
// ==========================================
function tryLogin() {
  const v = $('pw').value.replace(/\D/g, '');
  if (PASSWORDS.includes(v)) {
    startVideo();
    startMusic();
    $('login').classList.add('hide');

    setTimeout(() => {
      $('login').style.display = 'none';
      showQuizCard();
    }, 600);
  } else {
    $('err').textContent = "Not quite — try again 💗";
    const c = $('login');
    c.classList.remove('shake');
    void c.offsetWidth;
    c.classList.add('shake');
  }
}

$('go').onclick = tryLogin;
$('pw').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') tryLogin();
});

// ==========================================
// 🏓 Step 2: Question Box / Quiz Card
// ==========================================
let currentOffsetX = 0;
let currentOffsetY = 0;

function dodgeQuizCard() {
  const card = $('quiz');
  if (!card || card.classList.contains('hide')) return;

  const cardRect = card.getBoundingClientRect();
  const maxW = Math.max(30, (window.innerWidth - cardRect.width) / 2 - 20);
  const maxH = Math.max(30, (window.innerHeight - cardRect.height) / 2 - 20);

  // Jump to a new position that shifts significantly away from current offset
  let newX, newY, attempts = 0;
  do {
    newX = (Math.random() * 2 - 1) * maxW;
    attempts++;
  } while (Math.abs(newX - currentOffsetX) < 60 && attempts < 10 && maxW > 70);

  attempts = 0;
  do {
    newY = (Math.random() * 2 - 1) * maxH;
    attempts++;
  } while (Math.abs(newY - currentOffsetY) < 60 && attempts < 10 && maxH > 70);

  currentOffsetX = newX;
  currentOffsetY = newY;
  card.style.transform = `translate(${Math.round(newX)}px, ${Math.round(newY)}px)`;
}

function showQuizCard() {
  const quizCard = $('quiz');
  currentOffsetX = 0;
  currentOffsetY = 0;
  quizCard.style.transform = 'translate(0px, 0px)';
  quizCard.style.display = 'block';
  showQ('q1');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      quizCard.classList.remove('hide');
    });
  });
}

function showQ(id) {
  const q = QUIZ[id];
  const b = $('qbtns');
  $('qtext').textContent = q.t;
  b.innerHTML = '';

  const mk = (label, next, cls) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    if (cls) btn.className = cls;

    // When hovering or tapping "No", make the question card dodge away
    if (cls === 'alt') {
      btn.addEventListener('mouseenter', dodgeQuizCard);
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        dodgeQuizCard();
      }, { passive: false });
    }

    btn.onclick = () => (next === 'win' ? win() : showQ(next));
    b.appendChild(btn);
  };

  mk('Yes ✅', q.yes);
  if (!q.only) mk('No ❌', q.no, 'alt');
}

function spawnConfetti() {
  const E = ['🎂', '🍪', '🧸', '🏓', '🎉', '🧁'];
  for (let i = 0; i < 36; i++) {
    const e = document.createElement('span');
    e.className = 'cf';
    e.textContent = E[i % E.length];
    e.style.left = rnd(0, 100) + 'vw';
    e.style.fontSize = rnd(18, 34) + 'px';
    e.style.animationDuration = rnd(2.5, 5) + 's';
    e.style.animationDelay = rnd(0, 1.2) + 's';
    document.body.appendChild(e);
    setTimeout(() => e.remove(), 7000);
  }
}

function win() {
  currentOffsetX = 0;
  currentOffsetY = 0;
  $('quiz').style.transform = 'translate(0px, 0px)';

  $('qtext').innerHTML = 'Yay!! Pickleball na ta! 🎉<br><small>See you on the court!(joke basin ma pressure)</small>';
  $('qbtns').innerHTML = '';

  spawnConfetti();

  const proceedBtn = document.createElement('button');
  proceedBtn.className = 'proceed-btn';
  proceedBtn.textContent = 'Disclaimer: Pasensya nanguhag pic';
  proceedBtn.onclick = proceedToLetter;
  $('qbtns').appendChild(proceedBtn);

  // Automatically advance after 10 seconds if user hasn't clicked
  setTimeout(proceedToLetter, 10000);
}

// ==========================================
// 💌 Step 3: Main Letter & Photo Gallery
// ==========================================
let hasProceeded = false;

function proceedToLetter() {
  if (hasProceeded) return;
  hasProceeded = true;

  const quizCard = $('quiz');
  quizCard.style.transform = '';
  quizCard.classList.add('hide');

  setTimeout(() => {
    quizCard.style.display = 'none';

    // Populate letter contents
    $('to').textContent = "Happy Birthday, " + NAME + " 🎂";
    $('body').innerHTML = LETTER.map((t) => "<p>" + t + "</p>").join("") + '<p class="sig">' + SIGNED + '</p>';
    renderGallery();

    const letterElem = $('letter');
    letterElem.style.display = 'block';
    if (bdayVideo && bdayVideo.paused) {
      bdayVideo.play().catch(() => {});
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        letterElem.classList.add('show');
      });
    });
  }, 600);
}

// ==========================================
// 📸 Photo Gallery & Lightbox
// ==========================================
function addPhoto(src, caption, i) {
  const f = document.createElement('figure');
  f.className = 'photo';
  f.style.setProperty('--r', ((i % 2 ? 1 : -1) * (1 + Math.random() * 2)).toFixed(1) + 'deg');

  const box = document.createElement('div');
  box.className = 'img';

  const img = new Image();
  img.alt = caption || '';
  img.loading = 'lazy';
  img.onerror = () => { box.textContent = '🌸'; };
  img.src = src;
  box.appendChild(img);

  const c = document.createElement('figcaption');
  c.textContent = caption || '';

  f.tabIndex = 0;
  f.setAttribute('role', 'button');
  const open = () => {
    if (img.complete && img.naturalWidth) openLB(img.src, caption);
  };
  f.onclick = open;
  f.onkeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  };

  f.append(box, c);
  $('gallery').appendChild(f);
}

function renderGallery() {
  $('gallery').innerHTML = '';
  PHOTOS.forEach((p, i) => addPhoto(p.src, p.caption, i));

  // Owner mode: open with #edit in URL to customize photos & song on the fly
  if (location.hash === '#edit') {
    $('addBtn').hidden = false;
    $('addBtn').onclick = () => $('file').click();
    $('musicPick').hidden = false;
    $('musicPick').onclick = () => $('mfile').click();

    $('mfile').onchange = (e) => {
      const f = e.target.files[0];
      if (!f) return;
      audio.src = URL.createObjectURL(f);
      musicOK = true;
      startMusic();
    };

    $('file').onchange = (e) => {
      [...e.target.files].forEach((f, i) => {
        const r = new FileReader();
        r.onload = () => addPhoto(r.result, f.name.replace(/\.\w+$/, ''), i);
        r.readAsDataURL(f);
      });
    };
  }
}

// ==========================================
// 🔍 Lightbox Modal Controls
// ==========================================
const lb = $('lb');

function openLB(src, cap) {
  $('lbimg').src = src;
  $('lbcap').textContent = cap || '';
  lb.classList.add('open');
  requestAnimationFrame(() => lb.classList.add('vis'));
}

function closeLB() {
  lb.classList.remove('vis');
  setTimeout(() => lb.classList.remove('open'), 300);
}

$('lbx').onclick = closeLB;
lb.onclick = (e) => {
  if (e.target !== $('lbimg')) closeLB();
};

addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLB();
});
