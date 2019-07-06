/**
 * Shuffle an array
 */
export declare function shuffle<T>(arr: T[]): T[];
/**
 * Sort an array
 */
export declare function sort<T>(arr: T[]): T[];
/**
 * Sort array relative to object key
 */
export declare function sortByKey<T>(arr: Record<string, T>[], key: string): Record<string, T>[];
/**
 * Inverse array
 */
export declare function inverse<T>(arr: T[]): T[];
/**
 * Remove duplicates
 */
export declare function unique<T>(arr: T[]): T[];
/**
 * Split array into chunks
 */
export declare function chunk<T>(array: T[], count: number): T[][];
/**
 * Generate an array
 */
export declare function generate<T>(callback: (index: number, stop_running: () => void, previous: T) => T): T[];
/**
 * Generate enumeration
 */
export declare function generate_enumeration(count?: number, random?: boolean): number[];
/**
 * Find similar elements between two arrays
 */
export declare function similarity<T>(arr0: T[], arr1: T[]): T[];
/**
 * Find different elements between two arrays
 */
export declare function difference<T>(arr0: T[], arr1: T[]): T[];