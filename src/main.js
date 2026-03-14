// Sample Projects Data
const projects = [
  {
    title: "Eco-Sphere AI",
    description: "AI-powered ecosystem monitoring platform with interactive 3D visualizations.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    tags: ["Three.js", "Python", "React"]
  },
  {
    title: "Lumina Pay",
    description: "Next-gen fintech app with glassmorphic UI and biometric security.",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop",
    tags: ["Swift", "Node.js", "MongoDB"]
  },
  {
    title: "Aura Creative",
    description: "Minimalist portfolio template for high-end creative agencies.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
    tags: ["WebGL", "GLSL", "GSAP"]
  }
];

// Render Projects
const renderProjects = () => {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map(project => `
    <div class="project-card glass reveal" data-tilt data-tilt-max="10" data-tilt-speed="400" data-tilt-glare data-tilt-max-glare="0.2">
      <div class="project-image" style="background-image: url('${project.image}')"></div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
  
  // Initialize VanillaTilt if available
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".project-card"));
  }
};

// Typewriter Effect for About Section
const initTypewriter = () => {
  const aboutTextElement = document.getElementById('about-text');
  const skillsElement = document.getElementById('about-skills');
  if (!aboutTextElement) return;

  const textToType = aboutTextElement.getAttribute('data-text');
  aboutTextElement.innerHTML = ''; // clear it initially
  
  let i = 0;
  let isTyping = false;
  
  const typeWriter = () => {
    if (i < textToType.length) {
      aboutTextElement.innerHTML += textToType.charAt(i);
      i++;
      setTimeout(typeWriter, 15); // Adjust typing speed here (ms)
    } else {
      if(skillsElement) {
        skillsElement.style.transition = 'opacity 0.5s ease';
        skillsElement.style.opacity = 1;
        const tags = skillsElement.querySelectorAll('span');
        tags.forEach((tag, index) => {
          tag.style.opacity = 0;
          tag.style.transform = 'translateY(10px)';
          tag.style.transition = `all 0.4s ease ${index * 0.15}s`;
          setTimeout(() => {
            tag.style.opacity = 1;
            tag.style.transform = 'translateY(0)';
          }, 50);
        });
      }
    }
  };

  const handleScroll = () => {
    if (isTyping) return;
    
    // Fallback: use getBoundingClientRect for reliable trigger on mobile
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const rect = aboutSection.getBoundingClientRect();
      const inView = (rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9);
      
      if (inView && !isTyping) {
        isTyping = true;
        setTimeout(typeWriter, 300);
        window.removeEventListener('scroll', handleScroll);
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Check once immediately on load just in case it's already in view
  setTimeout(handleScroll, 500);
};

// Intersection Observer for Reveal Animations
const initReveal = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

// ScrollSpy Navigation
const initScrollSpy = () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
};

// tsParticles Background
const initParticles = () => {
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
      fullScreen: { enable: false },
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
          resize: true,
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 100, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.1,
          width: 1,
        },
        collisions: { enable: false },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: false,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: 40,
        },
        opacity: { value: 0.2 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    });
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initReveal();
  initTypewriter();
  initScrollSpy();
  initParticles();
});
