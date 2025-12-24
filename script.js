// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.getElementById('header');
const fadeElements = document.querySelectorAll('.fade-in');
const themeToggle = document.getElementById('theme-toggle');


// Mobile Menu Toggle
function toggleMenu() {
  navLinks.classList.toggle('active');
  hamburger.innerHTML = navLinks.classList.contains('active')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
}

// Close mobile menu when clicking on a link
function closeMenu() {
  navLinks.classList.remove('active');
  hamburger.innerHTML = '<i class="fas fa-bars"></i>';
}

// Header scroll effect
function handleScroll() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  if (currentTheme === 'light') {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
  } else {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(26, 26, 26, 0.98)';
      header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.background = 'rgba(26, 26, 26, 0.95)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
  }
}

// Theme toggle functionality
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update toggle icon
  const icon = themeToggle.querySelector('i');
  if (newTheme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Set initial icon
  const icon = themeToggle.querySelector('i');
  if (savedTheme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Fade in animation on scroll
function fadeInOnScroll() {
  fadeElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100 && elementBottom > 0) {
      element.classList.add('animate');
    }
  });
}

// Smooth scrolling for navigation links
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    const headerOffset = header.offsetHeight;
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Handle navigation clicks
function handleNavClick(e) {
  e.preventDefault();
  const target = e.target.getAttribute('href');
  smoothScroll(target);
  closeMenu();
}

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing animation
function initTypingAnimation() {
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 150);
    }, 500);
  }
}

// Project card hover effects
function initProjectHoverEffects() {
  const projectCards = document.querySelectorAll('.project');

  projectCards.forEach(card => {
    const image = card.querySelector('.project-image i');

    card.addEventListener('mouseenter', () => {
      image.style.transform = 'scale(1.1) rotate(5deg)';
      image.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
      image.style.transform = 'scale(1) rotate(0deg)';
    });
  });
}

// Skill tag animation
function initSkillAnimations() {
  const skills = document.querySelectorAll('.skill');

  skills.forEach((skill, index) => {
    skill.style.animationDelay = `${index * 0.1}s`;
    skill.classList.add('skill-animate');
  });
}

// Certification card stagger animation
function initCertificationAnimations() {
  const certCards = document.querySelectorAll('.certification-card');

  certCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });
}

// Scroll progress indicator
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    z-index: 1001;
    transition: width 0.3s ease;
  `;
  document.body.appendChild(progressBar);

  function updateProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }

  window.addEventListener('scroll', updateProgress);
}

// Initialize all functionality
function init() {
  // Event listeners
  hamburger.addEventListener('click', toggleMenu);
  themeToggle.addEventListener('click', toggleTheme);

  // Navigation links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', handleNavClick);
  });

  // Scroll events
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('scroll', fadeInOnScroll);

  // Initialize animations
  initTypingAnimation();
  initProjectHoverEffects();
  initSkillAnimations();
  initCertificationAnimations();
  initScrollProgress();

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  // Prevent right-click on images (optional)
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // Add loading class removal
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Load saved theme
  loadTheme();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Additional CSS for animations
const additionalStyles = `
.skill-animate {
  animation: skillFadeIn 0.6s ease forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes skillFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.certification-card {
  animation: certSlideIn 0.8s ease forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes certSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loaded .hero-background {
  animation: float 20s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// Add additional styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounced scroll handlers
window.addEventListener('scroll', debounce(handleScroll, 10));
window.addEventListener('scroll', debounce(fadeInOnScroll, 10));

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
});