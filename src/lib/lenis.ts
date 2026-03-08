import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initLenis() {
    if (typeof window === "undefined") return null;

    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 2,
    });

    // KUNCI: Sinkronisasi Lenis dengan GSAP ticker
    // Menggunakan priority true supaya scroll dihitung sebelum render animasi sekuensial
    gsap.ticker.add((time) => {
        lenis?.raf(time * 1000);
    }, false, true);

    // Matikan lagDefault GSAP ticker delay untuk respon instan
    gsap.ticker.lagSmoothing(0);

    // Hubungkan Lenis scroll event ke ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    return lenis;
}

export function getLenis() {
    return lenis;
}

export function destroyLenis() {
    if (lenis) {
        lenis.destroy();
        lenis = null;
    }
}
