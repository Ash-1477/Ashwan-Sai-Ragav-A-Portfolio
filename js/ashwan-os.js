/* ASHWAN.OS interactions — dependency-free and reduced-motion aware */
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Signature ASHWAN.OS boot sequence: ~1.5s total, without delaying page initialization.
  {
    const bootStyles = document.createElement('style');
    bootStyles.textContent = `
      .os-boot{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:24px;background:radial-gradient(ellipse at 50% 45%,rgba(91,48,151,.28),transparent 42%),#080510;color:#f7f1ff;opacity:1;visibility:visible;transition:opacity .35s ease,visibility .35s ease}
      .os-boot.is-gone{opacity:0;visibility:hidden;pointer-events:none}
      .os-boot-inner{width:min(460px,100%);text-align:center;position:relative}
      .os-boot-orbit{width:132px;height:132px;border:1px solid rgba(196,167,255,.42);border-radius:50%;margin:0 auto 24px;position:relative;display:grid;place-items:center;box-shadow:0 0 42px rgba(151,91,255,.28),inset 0 0 30px rgba(151,91,255,.2)}
      .os-boot-orbit:before,.os-boot-orbit:after{content:"";position:absolute;border:1px solid rgba(196,167,255,.34);border-radius:50%;inset:13px;transform:rotateX(68deg) rotate(-25deg)}
      .os-boot-orbit:after{inset:27px;transform:rotateY(68deg) rotate(35deg)}
      .os-boot-core{width:42px;height:42px;border-radius:13px;border:1px solid rgba(214,190,255,.6);background:radial-gradient(circle,rgba(182,156,255,.55),transparent 72%);box-shadow:0 0 28px rgba(151,91,255,.5);transform:rotate(45deg)}
      .os-boot-status{display:flex;justify-content:space-between;max-width:260px;margin:14px auto 0;font:8px 'DM Mono',monospace;letter-spacing:.13em;color:#c4a7ff;opacity:.78}
      @media(prefers-reduced-motion:no-preference){.os-boot-orbit{animation:os-boot-spin 12s linear infinite}.os-boot-core{animation:os-boot-pulse 2s ease-in-out infinite alternate}}
      @keyframes os-boot-spin{to{transform:rotate(360deg)}}@keyframes os-boot-pulse{to{transform:rotate(45deg) scale(1.16);box-shadow:0 0 42px rgba(151,91,255,.55)}}
      .os-boot-label{font:10px 'DM Mono',monospace;letter-spacing:.16em;text-transform:uppercase;color:#b9a8d5}
      .os-boot-mark{margin:22px 0;font:800 clamp(38px,9vw,64px) Manrope,sans-serif;letter-spacing:-.09em;color:#fff;text-shadow:0 0 32px rgba(174,126,255,.45)}
      .os-boot-mark span{color:#b69cff}
      .os-boot-track{height:2px;margin:26px auto 0;max-width:260px;overflow:hidden;background:rgba(190,160,255,.18)}
      .os-boot-track:after{content:"";display:block;width:42%;height:100%;background:linear-gradient(90deg,#8b5cf6,#e5caff);box-shadow:0 0 14px #a78bfa;animation:os-boot-progress 1.1s ease-out forwards}
      @keyframes os-boot-progress{from{transform:translateX(-110%)}to{transform:translateX(240%)}}
      @media(prefers-reduced-motion:reduce){.os-boot-track:after{animation:none;width:72%;transform:translateX(18%)}.os-boot{transition:none}}
    `;
    document.head.appendChild(bootStyles);
    const boot = document.createElement('div');
    boot.className = 'os-boot';
    boot.setAttribute('role', 'status');
    boot.setAttribute('aria-label', 'ASHWAN.OS booting');
    boot.innerHTML = '<div class="os-boot-inner"><div class="os-boot-label">PERSONAL INTERFACE · V1.0</div><div class="os-boot-orbit" aria-hidden="true"><div class="os-boot-core"></div></div><div class="os-boot-mark">ASHWAN<span>.OS</span></div><div class="os-boot-label">Initializing portfolio experience</div><div class="os-boot-track"></div><div class="os-boot-status"><span>DESIGN SYSTEM</span><span>ONLINE · 100%</span></div></div>';
    document.body.appendChild(boot);
    window.setTimeout(() => {
      boot.classList.add('is-gone');
      window.setTimeout(() => { boot.remove(); bootStyles.remove(); }, 380);
    }, 1500);
  }

  // Scroll progress indicator.
  const progress = document.createElement('div');
  progress.className = 'os-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  };
  updateProgress();
  let progressQueued = false;
  const queueProgressUpdate = () => {
    if (progressQueued) return;
    progressQueued = true;
    window.requestAnimationFrame(() => {
      updateProgress();
      progressQueued = false;
    });
  };
  window.addEventListener('scroll', queueProgressUpdate, { passive: true });
  window.addEventListener('resize', queueProgressUpdate, { passive: true });

  // Staggered reveal as sections enter the viewport.
  const revealTargets = document.querySelectorAll('main section .container > *, main section .portfolio-card, main section .grid > *');
  revealTargets.forEach((element, index) => {
    element.classList.add('os-reveal');
    if (element.classList.contains('portfolio-card') || element.parentElement?.classList.contains('grid')) {
      element.style.transitionDelay = Math.min((index % 4) * 75, 225) + 'ms';
    }
  });
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealTargets.forEach(element => revealObserver.observe(element));
  } else {
    revealTargets.forEach(element => element.classList.add('is-visible'));
  }

  // Pointer spotlight and subtle 3D card response on desktop only.
  const cards = document.querySelectorAll('.portfolio-card');
  cards.forEach(card => {
    card.classList.add('os-spotlight');
    if (reduceMotion || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    card.classList.add('os-tilt');
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty('--spot-x', x + 'px');
      card.style.setProperty('--spot-y', y + 'px');
      const rotateY = ((x / rect.width) - .5) * 3;
      const rotateX = ((.5 - y / rect.height)) * 3;
      card.style.transform = 'perspective(900px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-3px)';
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  // Add a live availability marker without changing any portfolio claims.
  const heroEyebrow = document.querySelector('#hero .container p');
  if (heroEyebrow && !heroEyebrow.querySelector('.os-live-dot')) {
    const dot = document.createElement('span');
    dot.className = 'os-live-dot';
    dot.setAttribute('aria-hidden', 'true');
    dot.style.cssText = 'display:inline-block;width:7px;height:7px;border-radius:50%;background:#c4b5fd;box-shadow:0 0 12px #a78bfa;margin-right:8px;vertical-align:middle';
    heroEyebrow.prepend(dot);
  }
  // Cinematic hero depth: restrained pointer parallax on desktop.
  const hero = document.querySelector('#hero');
  const portrait = document.querySelector('.os-portrait-frame');
  if (hero && portrait && !reduceMotion && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    let heroFrame = 0;
    hero.addEventListener('pointermove', event => {
      if (heroFrame) return;
      heroFrame = window.requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - .5;
        const py = (event.clientY - rect.top) / rect.height - .5;
        portrait.style.transform = 'perspective(1100px) rotateY(' + (px * 7).toFixed(2) + 'deg) rotateX(' + (-py * 6).toFixed(2) + 'deg) translateY(-3px)';
        hero.style.setProperty('--hero-pointer-x', (event.clientX - rect.left) + 'px');
        hero.style.setProperty('--hero-pointer-y', (event.clientY - rect.top) + 'px');
        heroFrame = 0;
      });
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { portrait.style.transform = ''; }, { passive: true });
  }
});
