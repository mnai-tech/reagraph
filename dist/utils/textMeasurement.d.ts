export interface TextDimensions {
    width: number;
    height: number;
}
export interface TextMeasurementOptions {
    text: string;
    fontSize: number;
    fontWeight?: number;
    fontFamily?: string;
}
/**
 * Measure text dimensions using Canvas API.
 * Results are cached for performance.
 *
 * @param options - Text measurement options
 * @returns Text dimensions (width and height)
 */
export declare function measureText(options: TextMeasurementOptions): TextDimensions;
/**
 * Clear the measurement cache.
 * Useful for testing or memory management.
 */
export declare function clearMeasurementCache(): void;
/**
 * Get the current cache size.
 */
export declare function getMeasurementCacheSize(): number;
