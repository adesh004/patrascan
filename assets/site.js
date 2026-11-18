// PatraScan website: reveal-on-scroll, screenshot carousel, docs TOC highlight.
(() => {
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }, { rootMargin: '0px 0px -8% 0px' })
    : null;
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io ? io.observe(el) : el.classList.add('in');
  });

  const g = document.querySelector('.gallery');
  document.querySelectorAll('[data-scroll]').forEach((b) =>
    b.addEventListener('click', () => g && g.scrollBy({ left: Number(b.dataset.scroll) * 272, behavior: 'smooth' })));

  const links = [...document.querySelectorAll('.toc a[href^="#"]')];
  if (links.length && 'IntersectionObserver' in window) {
    const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) {
        links.forEach((a) => a.classList.remove('active'));
        const a = map.get(e.target.id); if (a) a.classList.add('active');
      }
    }, { rootMargin: '-20% 0px -70% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
