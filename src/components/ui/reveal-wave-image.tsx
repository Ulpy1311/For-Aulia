"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* =========================================================
   RevealWaveImage Component
   - B&W 2-level dithering by default.
   - Animated continuous waves.
   - Mouse-interactive flashlight reveal of original color.
   - Mouse-interactive water ripples.
   - Smooth fading when mouse enters/leaves.
   - Scroll-driven frame animation (80 frames).
   ========================================================= */

const TOTAL_FRAMES = 80;
const frames = Array.from(
    { length: TOTAL_FRAMES },
    (_, i) => `/Photo Landing/1000258716_frame_${i + 1}.jpg`
);

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uRevealRadius;
  uniform float uRevealSoftness;
  uniform float uPixelSize;
  uniform float uMouseActive;
  
  uniform float uWaveSpeed;
  uniform float uWaveFrequency;
  uniform float uWaveAmplitude;
  uniform float uMouseRadius;
  
  varying vec2 vUv;
  
  // Bayer 4x4 dithering pattern
  float bayer4x4(vec2 pos) {
    int x = int(mod(pos.x, 4.0));
    int y = int(mod(pos.y, 4.0));
    int index = x + y * 4;
    
    float pattern[16];
    pattern[0] = 0.0;    pattern[1] = 8.0;    pattern[2] = 2.0;    pattern[3] = 10.0;
    pattern[4] = 12.0;   pattern[5] = 4.0;    pattern[6] = 14.0;   pattern[7] = 6.0;
    pattern[8] = 3.0;    pattern[9] = 11.0;   pattern[10] = 1.0;   pattern[11] = 9.0;
    pattern[12] = 15.0;  pattern[13] = 7.0;   pattern[14] = 13.0;  pattern[15] = 5.0;
    
    for (int i = 0; i < 16; i++) {
        if (i == index) return pattern[i] / 16.0;
    }
    return 0.0;
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Wave and Ripple Distortions
    float time = uTime;
    float waveStrength = uWaveAmplitude * 0.1;
    
    // Continuous waves
    float wave1 = sin(uv.y * uWaveFrequency + time * uWaveSpeed) * waveStrength;
    float wave2 = sin(uv.x * uWaveFrequency * 0.7 + time * uWaveSpeed * 0.8) * waveStrength * 0.5;
    
    vec2 distortedUv = uv;
    distortedUv.x += wave1;
    distortedUv.y += wave2;
    
    // Mouse interaction (Ripple)
    if (uMouseActive > 0.01) {
        vec2 mousePos = uMouse;
        float dist = distance(uv, mousePos);
        float mouseInfluence = smoothstep(uMouseRadius, 0.0, dist);
        
        float rippleFreq = uWaveFrequency * 5.0;
        float rippleSpeed = uWaveSpeed * 1.0;
        float rippleStrength = uWaveAmplitude * 0.05;
        
        float ripple = sin(dist * rippleFreq - time * rippleSpeed) * rippleStrength * mouseInfluence * uMouseActive;
        distortedUv.x += ripple;
        distortedUv.y += ripple;
    }
    
    // Sampling and Color Logic
    vec4 color = texture2D(uTexture, distortedUv);
    
    // Grayscale conversion
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    
    // Dithering
    vec2 pixelCoord = floor(gl_FragCoord.xy / uPixelSize);
    float dither = bayer4x4(pixelCoord);
    
    // 2-level quantization
    float quantized;
    float adjusted = gray + (dither - 0.5) * 0.5;
    if (adjusted < 0.33) {
        quantized = 0.0;
    } else if (adjusted < 0.66) {
        quantized = 0.5;
    } else {
        quantized = 1.0;
    }
    vec3 bwColor = vec3(quantized);
    
    // Reveal Flashlight
    float revealDist = distance(uv, uMouse);
    float innerRadius = uRevealRadius * (1.0 - uRevealSoftness);
    float outerRadius = uRevealRadius;
    float revealAmount = 1.0 - smoothstep(innerRadius, outerRadius, revealDist);
    revealAmount *= uMouseActive;
    
    vec3 finalColor = mix(bwColor, color.rgb, revealAmount);
    
    gl_FragColor = vec4(finalColor, color.a);
  }
`;

// --------------- ImagePlane (inner Three.js mesh) ---------------

interface ImagePlaneProps {
    aspectRatio: number;
    revealRadius: number;
    revealSoftness: number;
    pixelSize: number;
    waveSpeed: number;
    waveFrequency: number;
    waveAmplitude: number;
    mouseRadius: number;
    isMouseInCanvas: boolean;
    frameIndexRef: React.MutableRefObject<number>;
    preloadedTextures: React.MutableRefObject<(THREE.Texture | null)[]>;
    lerpedMouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

function ImagePlane({
    aspectRatio,
    revealRadius,
    revealSoftness,
    pixelSize,
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    mouseRadius,
    isMouseInCanvas,
    frameIndexRef,
    preloadedTextures,
    lerpedMouseRef,
}: ImagePlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const mouseActiveRef = useRef(0);
    const hasEnteredRef = useRef(false);

    const uniforms = useMemo(
        () => ({
            uTexture: { value: new THREE.Texture() },
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(-10, -10) },
            uRevealRadius: { value: revealRadius },
            uRevealSoftness: { value: revealSoftness },
            uPixelSize: { value: pixelSize },
            uMouseActive: { value: 0 },
            uWaveSpeed: { value: waveSpeed },
            uWaveFrequency: { value: waveFrequency },
            uWaveAmplitude: { value: waveAmplitude },
            uMouseRadius: { value: mouseRadius },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const scale = useMemo<[number, number, number]>(() => {
        // Canvas clip-space is square (-1..1)
        if (aspectRatio > 1) {
            return [aspectRatio, 1, 1];
        } else {
            return [1, 1 / aspectRatio, 1];
        }
    }, [aspectRatio]);

    useFrame((state) => {
        const mat = meshRef.current?.material as THREE.ShaderMaterial | undefined;
        if (!mat) return;

        // Switch texture based on scroll-driven frame index
        const idx = Math.round(
            Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndexRef.current))
        );
        const textures = preloadedTextures.current;
        let tex = textures[idx];

        if (!tex) {
            for (let previous = idx - 1; previous >= 0; previous--) {
                if (textures[previous]) {
                    tex = textures[previous];
                    break;
                }
            }
        }

        if (!tex) {
            for (let next = idx + 1; next < TOTAL_FRAMES; next++) {
                if (textures[next]) {
                    tex = textures[next];
                    break;
                }
            }
        }

        if (tex) {
            mat.uniforms.uTexture.value = tex;
        }

        mat.uniforms.uTime.value = state.clock.elapsedTime;

        if (isMouseInCanvas) hasEnteredRef.current = true;
        const targetActive = isMouseInCanvas ? 1 : 0;
        mouseActiveRef.current += (targetActive - mouseActiveRef.current) * 0.08;
        mat.uniforms.uMouseActive.value = mouseActiveRef.current;

        if (hasEnteredRef.current) {
            mat.uniforms.uMouse.value.set(
                lerpedMouseRef.current.x,
                lerpedMouseRef.current.y
            );
        }
    });

    return (
        <mesh ref={meshRef} scale={scale}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

// --------------- Loading overlay ---------------

function LoadingBar({ progress }: { progress: number }) {
    if (progress >= 1) return null;
    return (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/80 pointer-events-none">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                Loading frames
            </p>
            <div className="w-48 h-[1px] bg-white/20 overflow-hidden">
                <div
                    className="h-full bg-white origin-left transition-transform duration-200"
                    style={{ transform: `scaleX(${progress})` }}
                />
            </div>
            <p className="font-mono text-[10px] text-white/40 tabular-nums">
                {Math.round(progress * 100)}%
            </p>
        </div>
    );
}

// --------------- Main exported component ---------------

interface RevealWaveImageProps {
    revealRadius?: number;
    revealSoftness?: number;
    pixelSize?: number;
    waveSpeed?: number;
    waveFrequency?: number;
    waveAmplitude?: number;
    mouseRadius?: number;
    className?: string;
}

export const RevealWaveImage = ({
    revealRadius = 0.2,
    revealSoftness = 0.5,
    pixelSize = 3,
    waveSpeed = 0.5,
    waveFrequency = 3.0,
    waveAmplitude = 0.2,
    mouseRadius = 0.2,
    className,
}: RevealWaveImageProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const frameIndexRef = useRef(0);
    const preloadedTextures = useRef<(THREE.Texture | null)[]>(
        new Array(TOTAL_FRAMES).fill(null)
    );

    const [loadProgress, setLoadProgress] = useState(0);
    const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);
    const [isSequenceFullyLoaded, setIsSequenceFullyLoaded] = useState(false);
    const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(16 / 9);

    const rawMouseRef = useRef({ x: 0.5, y: 0.5 });
    const lerpedMouseRef = useRef({ x: 0.5, y: 0.5 });

    // Lerp mouse for smooth trailing
    useEffect(() => {
        let animId: number;
        const tick = () => {
            lerpedMouseRef.current.x +=
                (rawMouseRef.current.x - lerpedMouseRef.current.x) * 0.08;
            lerpedMouseRef.current.y +=
                (rawMouseRef.current.y - lerpedMouseRef.current.y) * 0.08;
            animId = requestAnimationFrame(tick);
        };
        animId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animId);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        rawMouseRef.current.x = (e.clientX - rect.left) / rect.width;
        rawMouseRef.current.y = 1 - (e.clientY - rect.top) / rect.height;
    }, []);

    // GSAP ScrollTrigger — drives frame index
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                frameIndexRef.current = self.progress * (TOTAL_FRAMES - 1);
            },
        });

        return () => {
            trigger.kill();
        };
    }, []);

    // Preload all 80 textures
    useEffect(() => {
        const loader = new THREE.TextureLoader();
        const textures = preloadedTextures.current;
        let isCancelled = false;
        let resolvedCount = 0;
        let idleHandle: number | null = null;
        let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

        const finishOne = (index: number, texture?: THREE.Texture) => {
            resolvedCount++;
            setLoadProgress(resolvedCount / TOTAL_FRAMES);

            if (index === 0 && texture?.image) {
                const img = texture.image as HTMLImageElement;
                setAspectRatio(img.naturalWidth / img.naturalHeight);
                setIsFirstFrameReady(true);
            }

            if (resolvedCount === TOTAL_FRAMES) {
                setIsSequenceFullyLoaded(true);
            }
        };

        const loadTexture = (src: string, index: number) =>
            new Promise<void>((resolve) => {
                loader.load(
                    src,
                    (texture) => {
                        if (isCancelled) {
                            texture.dispose();
                            resolve();
                            return;
                        }

                        texture.minFilter = THREE.LinearFilter;
                        texture.magFilter = THREE.LinearFilter;
                        texture.colorSpace = THREE.SRGBColorSpace;
                        textures[index] = texture;
                        finishOne(index, texture);
                        resolve();
                    },
                    undefined,
                    (err) => {
                        console.warn("Failed to load frame", src, err);
                        finishOne(index);
                        resolve();
                    }
                );
            });

        const runWorker = async (indexes: number[]) => {
            for (const index of indexes) {
                if (isCancelled) return;
                await loadTexture(frames[index], index);
            }
        };

        const preloadRemaining = async () => {
            const concurrency = 4;
            const remaining = Array.from({ length: TOTAL_FRAMES - 1 }, (_, i) => i + 1);
            const chunks = Array.from({ length: concurrency }, () => [] as number[]);
            remaining.forEach((index, i) => {
                chunks[i % concurrency].push(index);
            });
            await Promise.all(chunks.map((chunk) => runWorker(chunk)));
        };

        const scheduleRemainingFrames = () => {
            if (typeof window !== "undefined" && "requestIdleCallback" in window) {
                idleHandle = window.requestIdleCallback(() => {
                    void preloadRemaining();
                });
                return;
            }

            timeoutHandle = setTimeout(() => {
                void preloadRemaining();
            }, 0);
        };

        void loadTexture(frames[0], 0).then(() => {
            if (!isCancelled) {
                scheduleRemainingFrames();
            }
        });

        return () => {
            isCancelled = true;
            if (idleHandle !== null) {
                if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
                    window.cancelIdleCallback(idleHandle);
                }
            }
            if (timeoutHandle !== null) {
                clearTimeout(timeoutHandle);
            }
            textures.forEach((t) => t?.dispose());
        };
    }, []);

    return (
        // Outer container: tall so scroll gives enough travel
        <div ref={containerRef} className={`h-[500vh] relative ${className ?? ""}`}>
            {/* Sticky viewport-filling canvas */}
            <div
                className="sticky top-[var(--nav-height)] h-[calc(100dvh-var(--nav-height))] w-full overflow-hidden"
                onMouseEnter={() => setIsMouseInCanvas(true)}
                onMouseLeave={() => setIsMouseInCanvas(false)}
                onMouseMove={handleMouseMove}
            >
                <Canvas
                    style={{ width: "100%", height: "100%", display: "block" }}
                    gl={{
                        antialias: false,
                        alpha: false,
                        depth: false,
                        stencil: false,
                        powerPreference: "high-performance",
                    }}
                    camera={{ position: [0, 0, 1] }}
                    dpr={[1, 1.5]}
                    frameloop={isFirstFrameReady ? "always" : "demand"}
                >
                    <ImagePlane
                        aspectRatio={aspectRatio}
                        revealRadius={revealRadius}
                        revealSoftness={revealSoftness}
                        pixelSize={pixelSize}
                        waveSpeed={waveSpeed}
                        waveFrequency={waveFrequency}
                        waveAmplitude={waveAmplitude}
                        mouseRadius={mouseRadius}
                        isMouseInCanvas={isMouseInCanvas}
                        frameIndexRef={frameIndexRef}
                        preloadedTextures={preloadedTextures}
                        lerpedMouseRef={lerpedMouseRef}
                    />
                </Canvas>

                {!isFirstFrameReady && <LoadingBar progress={loadProgress} />}

                {/* Scroll hint */}
                {isFirstFrameReady && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none animate-pulse">
                        <div className="w-[1px] h-8 bg-white/30" />
                        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/40">
                            Scroll
                        </p>
                    </div>
                )}

                {isFirstFrameReady && !isSequenceFullyLoaded && (
                    <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 backdrop-blur-sm">
                        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/55">
                            {Math.round(loadProgress * 100)}% loaded
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
