const sideMenu = document.querySelector('#sideMenu');
const navBar = document.querySelector('nav');
const navLinks = document.querySelector('nav ul');

function openMenu(){
    sideMenu.style.transform = 'translateX(-16rem)';
}

function closeMenu(){
    sideMenu.style.transform = 'translateX(16rem)';
}


window.addEventListener('scroll', () => {
    if (scrollY > 50) {
        navBar.classList.add('bg-white', 'bg-opacity-50', 'backdrop-blur-lg',
             'shadow-sm', 'dark-bg-darkTheme', 'dark:shadow-white/20');
        navLinks.classList.remove('bg-white', 'shadow-sm', 'bg-opacity-50', 
            'dark:border', 'dark:border-white/50', "dark:bg-transparent");
    } else {
        navBar.classList.remove('bg-white', 'bg-opacity-50', 'backdrop-blur-lg',
             'shadow-sm', 'dark-bg-darkTheme', 'dark:shadow-white/20');
                
        navLinks.classList.add('bg-white', 'shadow-sm', 'bg-opacity-50', 
            'dark:border', 'dark:border-white/50', "dark:bg-transparent");
    }
})


//-----------light mode dark mode-----------

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }




  function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  if (document.documentElement.classList.contains('dark')) {
    localStorage.theme = 'dark';
  } else {
    localStorage.theme = 'light';
  }
}

// Scroll animations
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If the element is in viewport
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

  // Observe all sections with animation
  const sections = document.querySelectorAll('#about, #services, #work, #contact');
  sections.forEach(section => {
    observer.observe(section);
  });

  // Add hover animations to service cards
  const serviceCards = document.querySelectorAll('#services .border');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('scale-105');
      card.style.transition = 'all 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('scale-105');
    });
  });

  // Add typing animation to the heading
  const animateTyping = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  };

  // Apply typing animation to the main heading after a delay
  setTimeout(() => {
    const mainHeading = document.querySelector('.h-screen h3');
    if (mainHeading) {
      const originalText = mainHeading.textContent;
      animateTyping(mainHeading, originalText);
    }
  }, 1000);
});