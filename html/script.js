const menuToggle = document.querySelector('.menu-toggle');
const topnav = document.querySelector('.topnav');
const navLinks = document.querySelectorAll('.topnav a');
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

menuToggle?.addEventListener('click', () => {
  topnav.classList.toggle('open');
  menuToggle.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
    topnav.classList.remove('open');
    menuToggle.classList.remove('open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      document.querySelectorAll('.topnav a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('section[id]').forEach(section => observer.observe(section));

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  if (!name || !email || !message) {
    feedback.textContent = 'Please complete all fields before sending.';
    feedback.style.color = '#ff6b6b';
    return;
  }

  const subject = encodeURIComponent('Portfolio Inquiry from ' + name);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:jebikbasnet8@gmail.com?subject=${subject}&body=${body}`;
  feedback.textContent = 'Opening email client…';
  feedback.style.color = '#37e4d1';
});
