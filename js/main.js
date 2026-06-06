/* ============================================
   HOPEBRIDGE FOUNDATION - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ===== Mobile Navigation Toggle =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // ===== Sticky Navigation =====
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ===== Back to Top Button =====
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Form Validation (Volunteer & Contact) =====
  const forms = document.querySelectorAll('form[novalidate]');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        const errorEl = document.getElementById(field.id + 'Error');
        if (!errorEl) return;

        field.classList.remove('error');
        errorEl.classList.remove('visible');

        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          errorEl.classList.add('visible');
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
          isValid = false;
          field.classList.add('error');
          errorEl.classList.add('visible');
        } else if (field.type === 'tel' && !isValidPhone(field.value)) {
          isValid = false;
          field.classList.add('error');
          errorEl.classList.add('visible');
        }
      });

      if (isValid) {
        const formContainer = form.closest('.form-container');
        const successId = formContainer ? formContainer.id + 'Success' : null;
        const successEl = document.getElementById('volunteerSuccess') || document.getElementById('contactSuccess');
        if (successEl) {
          form.style.display = 'none';
          successEl.classList.add('visible');
        }
      }
    });

    const fields = form.querySelectorAll('.form-control');
    fields.forEach(field => {
      field.addEventListener('input', function () {
        this.classList.remove('error');
        const errorEl = document.getElementById(this.id + 'Error');
        if (errorEl) errorEl.classList.remove('visible');
      });
    });
  });
});

// ===== Utility Functions =====
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\d\s\+\-\(\)]{7,20}$/.test(phone);
}

function resetForm(formId, successId) {
  const form = document.getElementById(formId);
  const success = document.getElementById(successId);
  if (form) {
    form.reset();
    form.style.display = 'block';
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.error-message').forEach(el => el.classList.remove('visible'));
  }
  if (success) success.classList.remove('visible');
}
