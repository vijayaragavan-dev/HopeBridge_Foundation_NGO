/* ============================================
   HOPEBRIDGE FOUNDATION - Gallery & Lightbox
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ===== Gallery Filter =====
  const filterBtns = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            item.classList.add('visible');
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ===== Lightbox =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentImageIndex = 0;
  let galleryImages = [];

  if (lightbox) {
    function openLightbox(index) {
      const visibleItems = Array.from(document.querySelectorAll('.gallery-item[style*="display: block"], .gallery-item:not([style*="display: none"])'));
      galleryImages = visibleItems.filter(item => item.querySelector('img')).map(item => ({
        src: item.querySelector('img').src,
        alt: item.querySelector('img').alt
      }));

      if (!galleryImages.length) return;

      currentImageIndex = index;
      showImage(currentImageIndex);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function showImage(index) {
      if (index >= 0 && index < galleryImages.length) {
        lightboxImage.src = galleryImages[index].src;
        lightboxImage.alt = galleryImages[index].alt;
      }
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function prevImage() {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage(currentImageIndex);
    }

    function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      showImage(currentImageIndex);
    }

    document.querySelectorAll('.gallery-item').forEach((item, index) => {
      item.addEventListener('click', function () {
        openLightbox(index);
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);

    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
});
