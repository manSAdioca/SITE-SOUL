// Disable smooth scroll libraries (Lenis / Locomotive) so native scroll works
(function() {
    function disableScrollLibraries() {
        if (typeof lenis !== 'undefined' && lenis) {
            try { lenis.destroy && lenis.destroy(); } catch(e) {}
        }
        if (window.lenis) {
            try { window.lenis.destroy && window.lenis.destroy(); } catch(e) {}
        }

        if (typeof LocomotiveScroll !== 'undefined') {
            try {
                if (window.locomotiveScroll) {
                    window.locomotiveScroll.destroy && window.locomotiveScroll.destroy();
                }
            } catch(e) {}
        }

        var html = document.documentElement;
        var body = document.body;

        html.classList.remove('lenis', 'lenis-smooth', 'has-scroll-smooth', 'has-scroll-init', 'has-scroll-scrolling');
        body.classList.remove('lenis', 'has-scroll-smooth');

        html.style.cssText += 'overflow-y: auto !important; height: auto !important;';
        body.style.cssText += 'overflow-y: auto !important; opacity: 1 !important; visibility: visible !important;';

        document.querySelectorAll('[data-scroll-container], .smooth-scroll, .lenis-wrapper').forEach(function(el) {
            el.style.cssText += 'transform: none !important; will-change: auto !important;';
        });
    }

    disableScrollLibraries();

    setTimeout(disableScrollLibraries, 100);
    setTimeout(disableScrollLibraries, 500);
    setTimeout(disableScrollLibraries, 1000);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', disableScrollLibraries);
    }

    window.Lenis = function() { return { destroy: function(){}, raf: function(){} }; };
})();
