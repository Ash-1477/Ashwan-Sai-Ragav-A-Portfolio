/**
 * Ashwan Sai Ragav A - Personal Portfolio
 * Interactive behaviors: Accessible mobile navigation, active section tracking, email clipboard copy.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Footer Year
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle with ARIA Attributes
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenu.classList.remove('hidden');
    if (menuIconOpen && menuIconClose) {
      menuIconOpen.classList.add('hidden');
      menuIconClose.classList.remove('hidden');
    }
  }

  function closeMobileMenu() {
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.classList.add('hidden');
    if (menuIconOpen && menuIconClose) {
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    }
  }

  function toggleMobileMenu() {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking on any mobile nav link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenuBtn.getAttribute('aria-expanded') === 'true') {
        closeMobileMenu();
        mobileMenuBtn.focus();
      }
    });
  }

  // 3. Email Copy to Clipboard Feature with Accessible Toast
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  const emailToast = document.getElementById('copy-toast');
  const toastText = document.getElementById('toast-text');
  const emailAddress = 'ashwansairagav9522@gmail.com';
  let toastTimer = null;

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailAddress);
        } else {
          // Fallback
          const textArea = document.createElement('textarea');
          textArea.value = emailAddress;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        showToast('Email address copied to clipboard!');
      } catch (err) {
        showToast('Email: ' + emailAddress);
      }
    });
  });

  function showToast(message) {
    if (!emailToast || !toastText) return;

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastText.textContent = message;
    emailToast.classList.remove('hidden');
    emailToast.style.opacity = '1';
    emailToast.style.transform = 'translateY(0)';

    toastTimer = setTimeout(() => {
      emailToast.style.opacity = '0';
      emailToast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        emailToast.classList.add('hidden');
      }, 300);
    }, 3200);
  }

  // 4. Highlight the current section with semantic state (violet theme).
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('header nav a[href^="#"]');

  function setCurrentSection(sectionId) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === '#' + sectionId) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrentSection(visible.target.id);
    }, {
      rootMargin: '-22% 0px -62% 0px',
      threshold: [0, 0.15, 0.35, 0.6]
    });
    sections.forEach(section => sectionObserver.observe(section));
  } else {
    const updateCurrentSection = () => {
      let current = sections[0];
      sections.forEach(section => {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) current = section;
      });
      if (current) setCurrentSection(current.id);
    };
    window.addEventListener('scroll', updateCurrentSection, { passive: true });
    updateCurrentSection();
  }

});
