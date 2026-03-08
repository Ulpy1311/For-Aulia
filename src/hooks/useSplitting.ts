"use client";

import { useEffect } from "react";

export function useSplitting(selector: string) {
    useEffect(() => {
        // Dynamic import karena Splitting tidak support SSR
        import("splitting").then(({ default: Splitting }) => {
            Splitting({ target: selector, by: "chars" });
        });
    }, [selector]);
}
