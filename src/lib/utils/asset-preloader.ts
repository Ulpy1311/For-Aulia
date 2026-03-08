/**
 * Asset Preloader Utility
 * 
 * Handles preloading of image assets and provides progress updates.
 */

export interface PreloadProgress {
    loaded: number;
    total: number;
    percentage: number;
    isComplete: boolean;
    currentAsset?: string;
}

export type OnProgressCallback = (progress: PreloadProgress) => void;

class AssetPreloader {
    private assets: string[] = [];
    private loadedCount = 0;
    private onProgress: OnProgressCallback | null = null;
    private static instance: AssetPreloader;

    private constructor() { }

    public static getInstance(): AssetPreloader {
        if (!AssetPreloader.instance) {
            AssetPreloader.instance = new AssetPreloader();
        }
        return AssetPreloader.instance;
    }

    /**
     * Set the list of assets to preload
     */
    public setAssets(assets: string[]): void {
        this.assets = assets;
        this.loadedCount = 0;
    }

    /**
     * Start preloading assets
     */
    public async preload(onProgress: OnProgressCallback): Promise<void> {
        this.onProgress = onProgress;

        if (this.assets.length === 0) {
            onProgress({ loaded: 0, total: 0, percentage: 100, isComplete: true, currentAsset: undefined });
            return;
        }

        const promises = this.assets.map((src, index) => this.loadImage(src));
        await Promise.all(promises);
    }

    private loadImage(src: string): Promise<void> {
        return new Promise((resolve) => {
            const img = new Image();

            const handleLoad = () => {
                this.loadedCount++;
                this.reportProgress(src);
                resolve();
            };

            const handleError = () => {
                console.warn(`Failed to preload asset: ${src}`);
                this.loadedCount++; // Count as loaded to avoid blocking forever
                this.reportProgress(src);
                resolve();
            };

            img.onload = handleLoad;
            img.onerror = handleError;
            img.src = src;
        });
    }

    private reportProgress(currentAsset?: string): void {
        if (this.onProgress) {
            const total = this.assets.length;
            const percentage = (this.loadedCount / total) * 100;
            this.onProgress({
                loaded: this.loadedCount,
                total,
                percentage,
                isComplete: this.loadedCount === total,
                currentAsset
            });
        }
    }
}

export const assetPreloader = AssetPreloader.getInstance();
