/** @format */

import type { Writable } from 'svelte/store';

/**
 * Persistable interface for persisting a value in local- or session storage.
 */
export interface Persistable<T> extends Writable<T> {
    /**
     * Clear the value stored in the selected storage.
     */
    clear: () => void;
}
