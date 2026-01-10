(() => {
  'use strict';
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        alert('Thanks! Your message was sent (demo). Replace this handler with your backend integration.');
        form.reset();
      }
      form.classList.add('was-validated');
    }, false);
  }
})();