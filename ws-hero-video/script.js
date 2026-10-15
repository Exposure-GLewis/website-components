(() => {
  document.querySelectorAll('.cl-hero-video').forEach((root) => {
    if (root.dataset.clHeroVideoReady) return;
    const video = root.querySelector('.cl-hero-video__video');
    if (!video) return;
    root.dataset.clHeroVideoReady = 'true';

    const button = root.querySelector('.cl-hero-video__toggle');
    const srText = button ? button.querySelector('.cl-hero-video__sr-only') : null;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const sources = {
      mobile: { src: video.dataset.mobileSrc || '/path/to/mobile.mp4', type: 'video/mp4' },
      tablet: { src: video.dataset.tabletSrc || '/path/to/tablet.mp4', type: 'video/mp4' },
      desktop: { src: video.dataset.desktopSrc || '/path/to/desktop.mp4', type: 'video/mp4' }
    };

    function getDevice() {
      const w = window.innerWidth;
      if (w <= 767) return 'mobile';
      if (w <= 1024) return 'tablet';
      return 'desktop';
    }

    let currentDevice = null;
    let userWantsPlaying = !prefersReducedMotion;

    function setSource() {
      const device = getDevice();
      if (device === currentDevice) return;

      currentDevice = device;
      const { src, type } = sources[device];

      video.pause();
      video.innerHTML = '';

      const source = document.createElement('source');
      source.src = src;
      source.type = type;
      video.appendChild(source);
      video.load();

      if (userWantsPlaying) {
        video.play().catch(() => {});
      }
    }

    function updateButton() {
      if (!button || !srText) return;

      const isPlaying = !video.paused;
      button.classList.toggle('is-playing', isPlaying);
      srText.textContent = isPlaying ? 'Pause video' : 'Play video';
    }

    setSource();
    window.addEventListener('resize', setSource);

    if (button) {
      button.addEventListener('click', () => {
        userWantsPlaying = video.paused;
        if (video.paused) video.play().catch(updateButton);
        else video.pause();
      });
    }

    video.addEventListener('play', () => {
      updateButton();
    });

    video.addEventListener('pause', () => {
      updateButton();
    });

    updateButton();
  });
})();
