(() => {
  document.querySelectorAll('.cl-hero-fader__media').forEach((root) => {
    if (root.dataset.clHeroFaderReady) return;

    const slides = Array.from(root.querySelectorAll('.cl-hero-fader__slide'));
    if (!slides.length) return;
    root.dataset.clHeroFaderReady = 'true';
    const btn = root.querySelector('.cl-hero-fader__toggle');
    const status = root.querySelector('.cl-hero-fader__status');
    const srText = btn ? btn.querySelector('.cl-hero-fader__sr-only') : null;
    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DELAY = 6000;

    let index = 0;
    let timer = null;
    let playing = !prefersReduced;

    function setActive(i) {
      slides.forEach((slide, n) => {
        const active = n === i;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });

      const currentImg = slides[i].querySelector('img');
      const alt = currentImg?.alt?.trim() || 'Image';

      if (status) {
        status.textContent = `Slide ${i + 1} of ${slides.length}: ${alt}`;
      }
    }

    function next() {
      index = (index + 1) % slides.length;
      setActive(index);
    }

    function play() {
      if (timer !== null) return;
      timer = setInterval(next, DELAY);
      playing = true;
      if (btn) btn.classList.add('is-playing');
      if (srText) srText.textContent = 'Pause Slideshow';
    }

    function pause() {
      clearInterval(timer);
      timer = null;
      playing = false;
      if (btn) btn.classList.remove('is-playing');
      if (srText) srText.textContent = 'Play Slideshow';
    }

    if (btn) {
      btn.addEventListener('click', () => {
        playing ? pause() : play();
      });
    }

    setActive(index);
    playing ? play() : pause();
  });
})();
