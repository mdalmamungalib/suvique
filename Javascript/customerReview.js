// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.reviews-carousel');
  const slides = document.querySelectorAll('.review-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  let currentIndex = 0;
  const slideCount = slides.length;
  
  // Update carousel position
  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update aria-hidden attributes
    slides.forEach((slide, index) => {
      slide.setAttribute('aria-hidden', index !== currentIndex);
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
      indicator.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
    });
  }
  
  // Go to specific slide
  function goToSlide(index) {
    currentIndex = (index + slideCount) % slideCount;
    updateCarousel();
  }
  
  // Next slide
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  // Previous slide
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  // Auto-advance (optional)
  let autoSlideInterval = setInterval(nextSlide, 5000);
  
  // Pause auto-advance on hover/focus
  carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  carousel.addEventListener('focusin', () => clearInterval(autoSlideInterval));
  
  // Resume auto-advance
  carousel.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
  });
  carousel.addEventListener('focusout', () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
  });
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });
  
  // Initialize
  updateCarousel();
});