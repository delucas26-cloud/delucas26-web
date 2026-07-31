// Hostal Prada — interacciones básicas (sin dependencias externas)

var COOKIE_KEY = 'hostalprada_cookie_consent';

function getCookieConsent() {
  try { return window.localStorage.getItem(COOKIE_KEY); }
  catch (e) { return null; }
}

function storeCookieConsent(value) {
  try { window.localStorage.setItem(COOKIE_KEY, value); }
  catch (e) { /* almacenamiento no disponible, seguimos sin romper nada */ }
}

function showCookieBanner() {
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;
  banner.style.display = 'flex';
  window.requestAnimationFrame(function () {
    banner.classList.add('is-visible');
  });
}

function hideCookieBanner() {
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;
  banner.classList.remove('is-visible');
  setTimeout(function () { banner.style.display = 'none'; }, 350);
}

function loadMap() {
  var iframe = document.getElementById('map-iframe');
  var placeholder = document.getElementById('map-placeholder');
  if (iframe && !iframe.getAttribute('src')) {
    iframe.setAttribute('src', iframe.getAttribute('data-src'));
    iframe.style.display = 'block';
  }
  if (placeholder) placeholder.style.display = 'none';
}

function setCookieConsent(value) {
  storeCookieConsent(value);
  hideCookieBanner();
  if (value === 'accepted') loadMap();
}

function openCookieSettings(e) {
  if (e) e.preventDefault();
  showCookieBanner();
}

document.addEventListener('DOMContentLoaded', function () {
  var consent = getCookieConsent();
  if (consent === 'accepted') {
    loadMap();
  } else if (consent !== 'rejected') {
    setTimeout(showCookieBanner, 700);
  }
});

document.addEventListener('DOMContentLoaded', function () {

  // Cabecera: cambia de estilo al hacer scroll
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (window.scrollY > 24) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menú móvil
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Animación de aparición al hacer scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

});
