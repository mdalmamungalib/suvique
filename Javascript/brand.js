document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.brand-carousel');
  const track = document.querySelector('.brand-track');
  
  // Clone slides for infinite loop (fallback if CSS fails)
  function cloneSlides() {
    const slides = document.querySelectorAll('.brand-slide:not(.cloned)');
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      clone.classList.add('cloned');
      track.appendChild(clone);
    });
  }
  
  // Check if prefers-reduced-motion is enabled
  function checkReduceMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      track.style.animation = 'none';
      // Implement alternative navigation
    }
  }
  
  // Initialize
  cloneSlides();
  checkReduceMotion();
  
  // Handle touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});
  
  function handleSwipe() {
    if (touchEndX < touchStartX) {
      // Swipe left - pause animation briefly
      track.style.animationPlayState = 'paused';
      setTimeout(() => {
        track.style.animationPlayState = 'running';
      }, 500);
    }
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    track.style.animation = 'none';
    setTimeout(() => {
      track.style.animation = 'scroll 30s linear infinite';
    }, 10);
  });
});