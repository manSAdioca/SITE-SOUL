/* Vertical marquee with scroll-reactive speed boost (testimonial columns) */
(function () {
  if (typeof window === 'undefined') return;

  const tracks = document.querySelectorAll('.marquee-track');
  if (!tracks.length) return;

  let scrollSpeed = 0;
  let lastScrollY = window.scrollY;
  let rafId = null;

  const trackStates = Array.from(tracks).map((track) => {
    const direction = track.getAttribute('data-direction') || 'up';
    const baseSpeed = parseFloat(track.getAttribute('data-speed') || '0.5');
    return {
      element: track,
      direction: direction === 'up' ? -1 : 1,
      baseSpeed,
      currentPos: 0,
      contentHeight: 0,
    };
  });

  function init() {
    trackStates.forEach((state) => {
      state.contentHeight = state.element.offsetHeight / 2;
    });
  }

  function update() {
    scrollSpeed *= 0.9;
    if (Math.abs(scrollSpeed) < 0.01) scrollSpeed = 0;

    trackStates.forEach((state) => {
      const speed = state.baseSpeed + (scrollSpeed * 0.5);
      state.currentPos += speed * state.direction;

      if (state.direction === -1 && state.currentPos <= -state.contentHeight) {
        state.currentPos += state.contentHeight;
      }
      if (state.direction === 1 && state.currentPos >= 0) {
        state.currentPos -= state.contentHeight;
      }

      state.element.style.transform = `translate3d(0, ${state.currentPos}px, 0)`;
    });

    rafId = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const delta = Math.abs(currentScrollY - lastScrollY);
    lastScrollY = currentScrollY;
    scrollSpeed += delta * 0.15;
    if (scrollSpeed > 15) scrollSpeed = 15;
  }, { passive: true });

  setTimeout(() => {
    init();
    trackStates.forEach((state) => {
      if (state.direction === 1) state.currentPos = -state.contentHeight;
    });
    update();
  }, 100);

  window.addEventListener('resize', () => {
    init();
  });
})();
