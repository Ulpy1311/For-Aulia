"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { Suspense } from "react";

export default function Scene({ children }: { children: React.ReactNode }) {
    return (
        <Canvas
            dpr={[1, 2]} // Max pixel ratio 2 untuk performa
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance", // Paksa GPU dedicated
                stencil: false,
                depth: true,
            }}
            camera={{ fov: 45, near: 0.1, far: 100 }}
            className="fixed inset-0 pointer-events-none z-0"
        >
            <Suspense fallback={null}>
                {children}
                <Preload all />
            </Suspense>
            <AdaptiveDpr pixelated /> {/* Auto-downscale saat performa berat */}
            <AdaptiveEvents /> {/* Konservasi resource saat tidak interaksi */}
        </Canvas>
    );
}
