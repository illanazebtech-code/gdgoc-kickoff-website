// GDGOC kickoff site - small bits of JS, nothing fancy.

// ---- mobile menu ----
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// close the menu after picking a link (otherwise it covers the page)
menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});


// ---- highlight the nav link of the section you're looking at ----
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const watched = ['home', 'about', 'highlights', 'teams', 'contact']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });

watched.forEach((section) => observer.observe(section));


// ---- demo form (nothing leaves the browser) ----
const form = document.getElementById('join-form');
const msg = document.getElementById('form-msg');

// only show red borders after the user has actually touched a field
form.querySelectorAll('input, select').forEach((field) => {
  field.addEventListener('blur', () => field.classList.add('touched'));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.querySelectorAll('input, select').forEach((f) => f.classList.add('touched'));

  if (!form.checkValidity()) {
    msg.textContent = 'Almost there - please fill in every field correctly.';
    msg.className = 'form-msg bad';
    form.querySelector(':invalid').focus();
    return;
  }

  const name = form.fullname.value.trim().split(' ')[0];
  msg.textContent = `Thanks ${name}! (Demo only - this form isn't connected to a backend, so nothing was saved.)`;
  msg.className = 'form-msg ok';
  form.reset();
  form.querySelectorAll('.touched').forEach((f) => f.classList.remove('touched'));
});

console.log('%cGDGOC Attock', 'font-size:18px;font-weight:bold;color:#4285f4');
console.log('Poking around in DevTools? Good. That is how most of us started - come join the Web Team.');
