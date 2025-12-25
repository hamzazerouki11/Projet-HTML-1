// Toggle mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navList.classList.toggle('show');
});

// Smooth scroll for internal links
document.querySelectorAll('.nav-list a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if(target){
      target.scrollIntoView({behavior:'smooth', block:'start'});

      // Close mobile menu after click
      if(navList.classList.contains('show')){
        navList.classList.remove('show');
        navToggle.setAttribute('aria-expanded','false');
      }
    }
  });
});

// Optional: highlight active section link on scroll
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-list a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = document.querySelector(`.nav-list a[href="#${id}"]`);
    if(entry.isIntersecting){
      navLinks.forEach(l => l.classList.remove('active'));
      link?.classList.add('active');
    }
  });
},{root: null, rootMargin: '0px', threshold: 0.5});

sections.forEach(s => observer.observe(s));

// Contact form handling (frontend only - replace with real endpoint as needed)
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Envoi...';

  // simple client validation
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  if(!name.value.trim() || !email.value.trim() || !message.value.trim()){
    alert('Veuillez compléter les champs requis.');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Envoyer';
    return;
  }

  // simulate network delay
  await new Promise(r => setTimeout(r, 700));

  // show success and reset form
  contactSuccess.hidden = false;
  contactSuccess.textContent = 'Merci ! Votre message a bien été envoyé.';
  contactForm.reset();
  submitBtn.disabled = false;
  submitBtn.textContent = 'Envoyer';

  // focus success message for screen readers
  contactSuccess.focus();
});

// Footer year and back-to-top button
const footerYear = document.getElementById('footer-year');
if(footerYear) footerYear.textContent = new Date().getFullYear();

const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if(!backToTop) return;
  if(window.scrollY > 300){
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({top:0, behavior:'smooth'});
});