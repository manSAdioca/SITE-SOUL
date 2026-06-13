const fs = require('fs');
const path = require('path');

function generateHtml(projectName, desc, themeColor, themeColorRgba, heroImg, assetsDir, outputFile) {
    const searchPath = path.join("C:\\Users\\samue\\OneDrive\\Desktop\\PROJETO SOUL", assetsDir);
    const extFilter = ['.jpg', '.png', '.webp', '.avif', '.jpeg'];
    
    let imageFiles = [];
    if (fs.existsSync(searchPath)) {
        const files = fs.readdirSync(searchPath);
        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (extFilter.includes(ext)) {
                imageFiles.push(path.join(assetsDir, file).replace(/\\/g, '/'));
            }
        }
    }
    
    let galleryHtml = "";
    for (const img of imageFiles) {
        galleryHtml += `
            <div class="masonry-item">
                <img src="${img}" class="w-full rounded-2xl border border-white/10 hover:border-white/30 transition-colors duration-500 hover:scale-[1.02] cursor-crosshair">
            </div>`;
    }

    const template = `<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth bg-[#030303]">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>${projectName} - Soul Design System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
        .masonry-grid { column-count: 1; column-gap: 1.5rem; }
        @media (min-width: 768px) { .masonry-grid { column-count: 2; } }
        @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
        .masonry-item { break-inside: avoid; margin-bottom: 1.5rem; }
        .masonry-item img { transform: scale(1); transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.5s; }
        .masonry-item:hover img { transform: scale(1.02); }
    </style>
</head>
<body class="text-white font-sans antialiased overflow-x-hidden bg-[#030303]">
    <nav class="fixed top-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference">
        <a href="index3.html#soul-projetos" class="text-white/70 hover:text-white transition-colors text-sm font-semibold uppercase tracking-widest inline-flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Voltar
        </a>
        <span class="text-white/50 text-xs font-mono uppercase tracking-[0.2em]">Estudo de Caso</span>
    </nav>

    <section class="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-black">
        <div class="absolute inset-0 z-0">
            <img src="${heroImg}" class="w-full h-full object-cover opacity-30 scale-105" id="hero-img">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/80 to-[#030303]"></div>
        </div>
        <div class="relative z-10 text-center max-w-5xl mx-auto px-6" id="hero-content">
            <span class="text-[${themeColor}] text-xs sm:text-sm tracking-[0.4em] uppercase mb-6 block font-mono font-semibold">Design System</span>
            <h1 class="text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">${projectName}</h1>
            <p class="text-lg md:text-2xl text-white/50 font-light">${desc}</p>
        </div>
        <div class="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 text-xs uppercase tracking-widest flex flex-col items-center gap-2 opacity-60">
            <span>Scroll para explorar</span>
            <div class="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </div>
    </section>

    <section class="py-24 md:py-32 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-3xl font-bold mb-4">Galeria Visual</h2>
            <p class="text-white/40">Visão geral dos componentes e identidade da interface.</p>
        </div>
        
        <div class="masonry-grid" id="gallery-grid">
            ${galleryHtml}
        </div>
    </section>
    
    <section class="py-32 text-center relative border-t border-white/5 bg-[#050505]">
        <div class="max-w-3xl mx-auto px-6">
            <h2 class="text-4xl md:text-6xl font-bold mb-8">Gostou deste estilo?</h2>
            <p class="text-xl text-white/50 mb-12">Vamos criar algo único para a sua marca.</p>
            <a href="index3.html" class="inline-flex items-center gap-3 px-10 py-5 bg-[${themeColor}] text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_${themeColorRgba}]">
                Iniciar Projeto
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
        </div>
    </section>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script>
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.from("#hero-content", { y: 50, opacity: 0, duration: 1.5, ease: "power3.out", delay: 0.2 });
        gsap.to("#hero-img", { scale: 1, duration: 2, ease: "power2.out" });

        const items = document.querySelectorAll('.masonry-item');
        items.forEach((item, i) => {
            gsap.from(item, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    </script>
</body>
</html>`;

    const outPath = path.join("C:\\Users\\samue\\OneDrive\\Desktop\\PROJETO SOUL", outputFile);
    fs.writeFileSync(outPath, template, 'utf8');
    console.log(`Gerado: ${outputFile}`);
}

generateHtml(
    "Lumina Video",
    "Um ecossistema visual imersivo para plataformas de streaming avançadas.",
    "#f97316",
    "rgba(249,115,22,0.3)",
    "lumina-video/assets/2b5079f4-4ddd-433b-a936-fc8f7d_7da21e998877.webp",
    "lumina-video/assets",
    "projeto-lumina.html"
);

generateHtml(
    "Aero Drone",
    "Design system e interfaces futuristas para tecnologia autônoma.",
    "#06b6d4",
    "rgba(6,182,212,0.3)",
    "ASSETSS/autonomous-drone-62.aura.build/assets/59aa4679bd568a7f_7a47e78d9544ac4d7f83a9f840c50b.png",
    "ASSETSS/autonomous-drone-62.aura.build/assets",
    "projeto-drone.html"
);

generateHtml(
    "Classic Barber",
    "Landing page premium com foco em elegância clássica masculina.",
    "#f59e0b",
    "rgba(245,158,11,0.3)",
    "ASSETSS/barbershop-landing-51.aura.build/assets/photo-1633681926022-84c23e8cb2_e6bc846c0450.avif",
    "ASSETSS/barbershop-landing-51.aura.build/assets",
    "projeto-barbershop.html"
);

generateHtml(
    "Vitalis Health",
    "Sistema de design limpo e de alta confiança para saúde corporativa.",
    "#14b8a6",
    "rgba(20,184,166,0.3)",
    "ASSETSS/white-medical/assets/photo-1612531386530-97286d97c2_02f597743435.avif",
    "ASSETSS/white-medical/assets",
    "projeto-vitalis.html"
);
