document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('last-modified').textContent = document.lastModified;

const hamburger = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    const isExpanded = menu.classList.toggle('menu-visible');
    hamburger.textContent = isExpanded ? 'X' : '☰';
    hamburger.setAttribute('aria-expanded', isExpanded);
});
