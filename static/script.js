/* ══════════════════════════════════════
   CaloriesAI — Full Premium JavaScript
   ══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ══════ LOADER ══════
  const loader   = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderPct = document.getElementById('loaderPct');
  const page     = document.getElementById('page');

  let pct = 0;
  const loadInterval = setInterval(() => {
    pct += Math.random() * 22 + 8;
    if (pct >= 100) {
      pct = 100;
      clearInterval(loadInterval);
      loaderBar.style.width = '100%';
      loaderPct.textContent = '100%';
      setTimeout(() => {
        loader.classList.add('done');
        page.classList.add('show');
        afterLoad();
      }, 400);
    } else {
      loaderBar.style.width = pct + '%';
      loaderPct.textContent = Math.round(pct) + '%';
    }
  }, 160);

  // ══════ NAVBAR SCROLL ══════
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('solid', window.scrollY > 40);
  }, { passive: true });

  // ══════ SMOOTH SCROLL for nav links ══════
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ══════ PARTICLES ══════
  initParticles();

  // ══════ SLIDER ↔ INPUT SYNC ══════
  const durationInput  = document.getElementById('duration');
  const durationSlider = document.getElementById('durationSlider');
  durationSlider && durationSlider.addEventListener('input', () => {
    durationInput.value = durationSlider.value;
  });
  durationInput && durationInput.addEventListener('input', () => {
    if (durationSlider) durationSlider.value = Math.min(120, Math.max(1, durationInput.value));
  });

  // ══════ FORM SUBMIT ══════
  const form      = document.getElementById('predictForm');
  const submitBtn = document.getElementById('submitBtn');

  form && form.addEventListener('submit', async e => {
    e.preventDefault();

    const numFields = ['age','height','weight','duration','heart','temp'];
    let valid = true;

    numFields.forEach(id => {
      const el = document.getElementById(id);
      const v  = parseFloat(el.value);
      if (!el.value || isNaN(v) || v <= 0) {
        valid = false;
        el.classList.add('error');
        setTimeout(() => el.classList.remove('error'), 1400);
      }
    });

    if (!valid) {
      toast('⚠️', 'Please fill all fields with valid values.', 'err');
      return;
    }

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const nameVal = document.getElementById('inputName').value.trim()
      || document.getElementById('nameHidden').value
      || 'User';

    const data = {
      Name:      nameVal,
      Gender:    parseFloat(document.getElementById('gender').value),
      Age:       parseFloat(document.getElementById('age').value),
      Height:    parseFloat(document.getElementById('height').value),
      Weight:    parseFloat(document.getElementById('weight').value),
      Duration:  parseFloat(document.getElementById('duration').value),
      Heart_Rate:parseFloat(document.getElementById('heart').value),
      Body_Temp: parseFloat(document.getElementById('temp').value),
    };

    try {
      const res = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();

      if (result.success) {
        displayResult(result, data);
        toast('✅', `Prediction complete for ${result.name}!`, 'ok');
        // Scroll to result
        document.getElementById('resultCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        toast('❌', result.error || 'Prediction failed.', 'err');
      }
    } catch (err) {
      toast('❌', 'Could not reach server. Is Flask running?', 'err');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });

  // ══════ INTERSECTION OBSERVER for about section ══════
  const accRing  = document.getElementById('accRing');
  const accVal   = document.getElementById('accVal');
  if (accRing && accVal) {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // 0.982 → ring: circumference 327, fill = 0.982*327 = 320.6
        accRing.style.strokeDashoffset = 327 - (0.982 * 327);
        animCounter(accVal, 0, 98.2, 2000, 1);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(document.getElementById('about'));
  }

});

// ══════════════════════════════════
function afterLoad() {
  // Stagger card entrance
  document.querySelectorAll('.glass-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'opacity .7s cubic-bezier(0.16,1,0.3,1), transform .7s cubic-bezier(0.16,1,0.3,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + i * 120);
  });
}

// ══════ DISPLAY RESULT ══════
function displayResult(result, data) {
  document.getElementById('resultEmpty').style.display  = 'none';
  const out = document.getElementById('resultOutput');
  out.classList.add('on');

  // Counter
  const kcalEl = document.getElementById('kcalEl');
  animCounter(kcalEl, 0, result.calories_burned, 1400, 1);

  document.getElementById('resultName').textContent = `🎉 Good job, ${result.name}!`;

  const msg = result.calories_burned < 100
    ? 'Light activity. A great start to staying active!'
    : result.calories_burned < 250
    ? 'Solid workout session. Keep up the momentum!'
    : result.calories_burned < 450
    ? 'Impressive burn! Your effort is paying off.'
    : 'Exceptional performance! That\'s elite-level effort 🏆';
  document.getElementById('resultMsg').textContent = msg;

  // Ring progress
  setTimeout(() => {
    const ring = document.getElementById('ringProg');
    const pct  = Math.min(result.calories_burned / 600, 1);
    ring.style.strokeDashoffset = 534 - pct * 534;
  }, 200);

  // Metrics
  document.querySelector('#rDur  .rmet__v').textContent  = data.Duration  + ' min';
  document.querySelector('#rHr   .rmet__v').textContent  = data.Heart_Rate + ' bpm';
  document.querySelector('#rTemp .rmet__v').textContent  = data.Body_Temp  + ' °C';
  document.querySelector('#rWt   .rmet__v').textContent  = data.Weight     + ' kg';
}

window.resetResult = function () {
  document.getElementById('resultEmpty').style.display  = '';
  const out = document.getElementById('resultOutput');
  out.classList.remove('on');
  // Reset ring
  const ring = document.getElementById('ringProg');
  if (ring) ring.style.strokeDashoffset = '534';
  document.getElementById('predictForm').reset();
};

// ══════ ANIMATED COUNTER ══════
function animCounter(el, from, to, ms, decimals = 0) {
  const t0 = performance.now();
  function tick(now) {
    const p = Math.min((now - t0) / ms, 1);
    const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
    el.textContent = (from + (to - from) * e).toFixed(decimals);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = to.toFixed(decimals);
  }
  requestAnimationFrame(tick);
}

// ══════ TOAST ══════
function toast(icon, msg, type) {
  const wrap = document.getElementById('toastWrap');
  const t = document.createElement('div');
  t.className = `toast toast--${type}`;
  t.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  wrap.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 500);
  }, 3500);
}

// ══════ PARTICLES ══════
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dots = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    createDots();
  }

  function createDots() {
    const n = Math.min(Math.floor(W * H / 16000), 70);
    dots = Array.from({ length: n }, () => mkDot());
  }

  function mkDot() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.3 + 0.4,
      vx: (Math.random() - .5) * .22,
      vy: (Math.random() - .5) * .22,
      o:  Math.random() * .2 + .04,
      od: Math.random() > .5 ? 1 : -1,
      c:  Math.random() > .5 ? '34,197,94' : '249,115,22',
    };
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      d.o  += d.od * .0012;
      if (d.o > .25)  d.od = -1;
      if (d.o < .04)  d.od = 1;
      if (d.x < 0 || d.x > W || d.y < 0 || d.y > H) Object.assign(d, mkDot());

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${d.c},${d.o})`;
      ctx.fill();
    });

    // connections
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(34,197,94,${(1 - dist / 120) * 0.06})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  frame();
}