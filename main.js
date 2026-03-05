// ═══════════════════════════════════════════
//  GILBERT FAVOUR JAMES · PORTFOLIO JS
// ═══════════════════════════════════════════

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateTrail() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.left = tx + 'px';
  trail.style.top  = ty + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0'; trail.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1'; trail.style.opacity = '1';
});


/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
});


/* ── HAMBURGER MENU ── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

document.querySelectorAll('.mob-link').forEach(l => {
  l.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = ''; s.style.opacity = '';
    });
  });
});


/* ── ACTIVE NAV LINK ── */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}


/* ── TYPED ROLE ── */
const roles  = ['Full Stack Developer', 'Backend Engineer', 'API Architect', 'UI Craftsman', 'Problem Solver'];
let rIdx = 0, cIdx = 0, deleting = false;
const typed = document.getElementById('typedRole');

function typeLoop() {
  const word = roles[rIdx];
  if (!deleting) {
    typed.textContent = word.slice(0, ++cIdx);
    if (cIdx === word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    typed.textContent = word.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 50 : 80);
}
typeLoop();


/* ── COUNT-UP STATS ── */
function countUp(el) {
  const target = parseInt(el.dataset.target);
  let current  = 0;
  const step   = Math.ceil(target / 40);
  const timer  = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 40);
}


/* ── REVEAL ON SCROLL (IntersectionObserver) ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');

    // count-up for stat numbers
    entry.target.querySelectorAll('.stat-num').forEach(countUp);

    // trigger skill bars when skill cards become visible
    if (entry.target.classList.contains('skill-card')) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.style.getPropertyValue('--w') ||
          getComputedStyle(bar).getPropertyValue('--w');
      });
    }

    io.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .skill-card').forEach(el => io.observe(el));

// also trigger hero stats on load
setTimeout(() => {
  document.querySelectorAll('.stat-num').forEach(el => {
    if (!el.dataset.counted) { countUp(el); el.dataset.counted = true; }
  });
}, 1000);


/* ── CONTACT FORM ── */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#00ffb0';
    btn.style.color = '#030510';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled = false;
      btn.style.background = '';
      btn.style.color = '';
      this.reset();
    }, 3000);
  }, 1500);
});


/* ── SMOOTH SCROLL FOR ALL ANCHOR LINKS ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ── GLITCH PHOTO ON HOVER ── */
const photoMain = document.getElementById('photoMain');
if (photoMain) {
  photoMain.parentElement.addEventListener('mouseenter', () => {
    photoMain.parentElement.classList.add('glitch-active');
  });
  photoMain.parentElement.addEventListener('mouseleave', () => {
    photoMain.parentElement.classList.remove('glitch-active');
  });
}


/* ── TILT EFFECT ON PROJECT CARDS ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ── SKILL CARD BARS (fallback for already visible) ── */
window.addEventListener('load', () => {
  document.querySelectorAll('.skill-card.visible .skill-fill').forEach(bar => {
    bar.style.width = getComputedStyle(bar).getPropertyValue('--w');
  });
});


/* ── CONSOLE EASTER EGG ── */
console.log('%c👋 Hey there, fellow dev!', 'font-size:20px;font-weight:bold;color:#00f0ff;');
console.log('%cBuilt by Gilbert Favour James · Full Stack Developer 🇳🇬', 'font-size:14px;color:#7a8fb0;');
console.log('%cLet\'s connect → your@email.com', 'font-size:13px;color:#00ffb0;');