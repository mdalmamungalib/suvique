document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('beforeAfter');
  const afterImage = document.getElementById('afterImage');
  const sliderLine = document.getElementById('sliderLine');
  const sliderButton = document.getElementById('sliderButton');
  
  let isDragging = false;
  let animationFrameId = null;
  let currentPosition = 50; // Start at 50%

  // Initialize slider position
  function initSlider() {
    moveSliderToPercent(currentPosition);
  }

  // Move slider to specific percentage
  function moveSliderToPercent(percent) {
    percent = Math.max(0, Math.min(100, percent));
    currentPosition = percent;
    
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    
    animationFrameId = requestAnimationFrame(() => {
      afterImage.style.width = `${percent}%`;
      sliderLine.style.left = `${percent}%`;
      sliderButton.style.left = `${percent}%`;
      
      // Update ARIA attributes
      sliderButton.setAttribute('aria-valuenow', Math.round(percent));
      sliderButton.setAttribute('aria-valuetext', `${Math.round(percent)}% comparison`);
    });
  }

  // Calculate position from mouse/touch event
  function calculatePosition(clientX) {
    const rect = container.getBoundingClientRect();
    let position = ((clientX - rect.left) / rect.width) * 100;
    return Math.max(0, Math.min(100, position));
  }

  // Event handlers
  function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    document.body.style.cursor = 'ew-resize';
    container.classList.add('dragging');
    
    // Handle both mouse and touch events
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (clientX) {
      moveSliderToPercent(calculatePosition(clientX));
    }
  }

  function stopDrag() {
    if (isDragging) {
      isDragging = false;
      document.body.style.cursor = '';
      container.classList.remove('dragging');
    }
  }

  function handleMove(e) {
    if (isDragging) {
      e.preventDefault();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      if (clientX) {
        moveSliderToPercent(calculatePosition(clientX));
      }
    }
  }

  // Keyboard navigation
  function handleKeyDown(e) {
    if (document.activeElement === sliderButton) {
      let newPosition = currentPosition;
      
      switch(e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          newPosition -= 5;
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          newPosition += 5;
          break;
        case 'Home':
          newPosition = 0;
          break;
        case 'End':
          newPosition = 100;
          break;
        default:
          return;
      }
      
      e.preventDefault();
      moveSliderToPercent(newPosition);
    }
  }

  // Initialize
  initSlider();

  // Event listeners
  sliderButton.addEventListener('mousedown', startDrag);
  sliderButton.addEventListener('touchstart', startDrag, { passive: false });
  
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('touchend', stopDrag);
  
  window.addEventListener('mousemove', handleMove);
  window.addEventListener('touchmove', handleMove, { passive: false });
  
  // Keyboard accessibility
  sliderButton.addEventListener('keydown', handleKeyDown);
  sliderButton.setAttribute('role', 'slider');
  sliderButton.setAttribute('aria-valuemin', '0');
  sliderButton.setAttribute('aria-valuemax', '100');
  sliderButton.setAttribute('aria-valuenow', '50');
  sliderButton.setAttribute('tabindex', '0');

  // Handle window resize
  window.addEventListener('resize', initSlider);
});