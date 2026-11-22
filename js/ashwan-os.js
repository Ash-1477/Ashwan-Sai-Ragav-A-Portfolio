/* ASHWAN.OS interactions — dependency-free and reduced-motion aware */
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Brief boot sequence: a small signature moment, never blocks navigation.
  if (!reduceMotion && !sessionStorage.getItem('ashwan-os-booted')) {
    const boot = document.createElement('div');
    boot.className = 'os-boot';
    boot.setAttribute('aria-label', 'ASHWAN.OS loading');
    boot.innerHTML = '<div class="os-boot-inner"><div class="os-boot-label">Personal interface · v1.0</div><div class="os-boot-mark">ASHWAN<span>.OS</span></div><div class="os-boot-label">Loading portfolio experience</div><div class="os-boot-track"></div></div>';
    document.body.appendChild(boot);
    window.setTimeout(() => {
      boot.classList.add('is-gone');
      sessionStorage.setItem('ashwan-os-booted', '1');
      window.setTimeout(() => boot.remove(), 700);
    }, 1050);
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
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

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
});
