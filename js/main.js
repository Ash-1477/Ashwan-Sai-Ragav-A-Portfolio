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

  // 4. Highlight Active Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-blue-600', 'font-semibold');
          link.classList.add('text-slate-600');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-blue-600', 'font-semibold');
            link.classList.remove('text-slate-600');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
});
