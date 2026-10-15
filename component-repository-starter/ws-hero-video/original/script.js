(() => {
  const video = document.getElementById('responsiveVideo');
  if (!video) return;

  const button = document.getElementById('videoToggle');
  const srText = button ? button.querySelector('.sr-only') : null;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sources = {
    mobile: { src: '/path/to/mobile.mp4', type: 'video/mp4' },
    tablet: { src: '/path/to/tablet.mp4', type: 'video/mp4' },
    desktop: { src: '/path/to/desktop.mp4', type: 'video/mp4' }
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

    if (!prefersReducedMotion && userWantsPlaying) {
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
      video.paused ? video.play() : video.pause();
    });
  }

  video.addEventListener('play', () => {
    userWantsPlaying = true;
    updateButton();
  });

  video.addEventListener('pause', () => {
    userWantsPlaying = false;
    updateButton();
  });

  updateButton();
})();
