document.addEventListener("DOMContentLoaded", () => {
    const layer = document.getElementById("ecosystem-layer");
    if (!layer) return;

    const badges = Array.from(document.querySelectorAll(".eco-badge"));
    const stage = document.getElementById("filmStage");
    
    // Parallax mouse variables
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // Track mouse on stage
    if (stage) {
        stage.addEventListener("mousemove", (e) => {
            const rect = stage.getBoundingClientRect();
            // Normalize from -1 to 1
            targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            targetMouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        });
        
        stage.addEventListener("mouseleave", () => {
            targetMouseX = 0;
            targetMouseY = 0;
        });
    }

    // Initialize organic parameters for each badge
    const badgeData = badges.map((badge, i) => {
        // Target the inner element so we don't conflict with GSAP's transform on the outer .eco-badge
        const innerEl = badge.firstElementChild; 
        
        // Add will-change for maximum performance
        innerEl.style.willChange = "transform";

        return {
            el: innerEl,
            time: Math.random() * 10000,
            speedX: 0.00015 + Math.random() * 0.0001,  // Muito mais lento para passeio horizontal
            speedY: 0.0002 + Math.random() * 0.00015,  // Movimento vertical sutil
            radiusX: 60 + Math.random() * 100, // Passeio muito mais amplo de um lado para o outro (até 160px)
            radiusY: 15 + Math.random() * 25,  // Movimento vertical mantido curto para não vazar a seção
            parallaxFactor: 30 + Math.random() * 40, // Efeito 3D do mouse mais forte
            rotationSpeed: (Math.random() - 0.5) * 0.001,
            rotationBase: (Math.random() - 0.5) * 8, // slight base tilt
        };
    });

    let lastTime = performance.now();

    function animate(now) {
        const delta = now - lastTime;
        lastTime = now;

        // Smooth lerping for mouse parallax (easing)
        mouseX += (targetMouseX - mouseX) * 0.06;
        mouseY += (targetMouseY - mouseY) * 0.06;

        badgeData.forEach(data => {
            data.time += delta;
            
            // Organic floating math (Lissajous curves)
            const floatX = Math.sin(data.time * data.speedX) * data.radiusX;
            const floatY = Math.cos(data.time * data.speedY) * data.radiusY;
            
            // Inverse mouse parallax for 3D depth
            const parallaxX = mouseX * -data.parallaxFactor;
            const parallaxY = mouseY * -data.parallaxFactor;
            
            // Organic slow rotation
            const rot = data.rotationBase + Math.sin(data.time * data.rotationSpeed) * 4;

            // Apply via translate3d for hardware acceleration
            data.el.style.transform = `translate3d(${floatX + parallaxX}px, ${floatY + parallaxY}px, 0) rotate(${rot}deg)`;
        });

        requestAnimationFrame(animate);
    }

    // Start loop
    requestAnimationFrame(animate);
});
