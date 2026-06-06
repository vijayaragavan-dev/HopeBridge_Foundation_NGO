/* ============================================
   HOPEBRIDGE FOUNDATION - Scroll Reveal & Counters
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ===== Scroll Reveal Animations =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== Animated Counters =====
  const counters = document.querySelectorAll('.count');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        if (isNaN(target)) return;

        counter.classList.add('counting');

        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          counter.textContent = current.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        }

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(counter);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => counterObserver.observe(counter));

  // ===== Testimonial Slider Auto-Scroll =====
  const slider = document.getElementById('testimonialSlider');
  if (slider) {
    let scrollInterval;
    let isPaused = false;

    function startAutoScroll() {
      scrollInterval = setInterval(() => {
        if (isPaused) return;
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (slider.scrollLeft >= maxScroll - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: 420, behavior: 'smooth' });
        }
      }, 4000);
    }

    slider.addEventListener('mouseenter', () => { isPaused = true; });
    slider.addEventListener('mouseleave', () => { isPaused = false; });
    slider.addEventListener('touchstart', () => { isPaused = true; });
    slider.addEventListener('touchend', () => { isPaused = false; });

    startAutoScroll();
  }
});
