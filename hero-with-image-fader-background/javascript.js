<script>
	(() => {
	const root = document.querySelector('.image-fader');
		if (!root) return;

		const slides = Array.from(root.querySelectorAll('.slide'));
		const btn = root.querySelector('.fader-toggle');
		const status = root.querySelector('.fader-status');
		const srText = btn ? btn.querySelector('.sr-only') : null;
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
	})();
</script>