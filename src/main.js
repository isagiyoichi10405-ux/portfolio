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
    <div class="project-card glass reveal">
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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isTyping) {
        isTyping = true;
        // Small delay before starting to type
        setTimeout(typeWriter, 300); 
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 }); // Start when 50% of the section is visible

  if (document.getElementById('about')) {
    observer.observe(document.getElementById('about'));
  }
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initReveal();
  initTypewriter();
});
