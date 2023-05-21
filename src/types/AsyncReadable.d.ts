/** @format */

import type { Readable } from 'svelte/store';

/**
 * AsyncReadable interface to create `loading`, `error` & `data` stores.
 */
export interface AsyncReadable<T> {
    loading: Readable<boolean>;
    error: Readable<Error | null>;
    data: Readable<T | null>;
}
