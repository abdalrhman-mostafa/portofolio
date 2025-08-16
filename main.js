// Typing Animation
const text = "Abdalrhman Mostafa";
const typingElement = document.getElementById("typingText");
let index = 0;

function typeText() {
  if (index < text.length) {
    typingElement.textContent = text.slice(0, index + 1);
    index++;
    setTimeout(typeText, 120);
  }
}

// Scroll Progress
function updateScrollProgress() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById("scrollProgress").style.width = scrollPercent + "%";
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate skill bars
      if (entry.target.classList.contains("skill-item")) {
        const skillProgress = entry.target.querySelector(".skill-progress");
        const skillValue = entry.target.getAttribute("data-skill");
        setTimeout(() => {
          skillProgress.style.width = skillValue + "%";
        }, 300);
      }
    }
  });
}, observerOptions);

// Smooth scrolling for navigation links
function smoothScroll(target) {
  const element = document.querySelector(target);
  const offsetTop = element.offsetTop - 80;
  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
}

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  mobileMenu.classList.toggle("hidden");
}

// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 8 + "s";
    particle.style.animationDuration = Math.random() * 4 + 6 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Start typing animation
  setTimeout(typeText, 1000);

  // Create particles
  createParticles();

  // Observe all fade-in elements
  document.querySelectorAll(".fade-in, .skill-item").forEach((el) => {
    observer.observe(el);
  });

  // Add scroll event listener
  window.addEventListener("scroll", updateScrollProgress);

  // Navigation links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("href");
      smoothScroll(target);

      // Close mobile menu if open
      document.getElementById("mobileMenu").classList.add("hidden");
    });
  });

  // Mobile menu button
  document
    .getElementById("mobileMenuBtn")
    .addEventListener("click", toggleMobileMenu);

  // Form submission
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert(
      "Thank you for your message! I will get back to you soon to discuss your digital design project."
    );
    this.reset();
  });

  // Navbar background on scroll
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("bg-white/95");
    } else {
      navbar.classList.remove("bg-white/95");
    }
  });
});
