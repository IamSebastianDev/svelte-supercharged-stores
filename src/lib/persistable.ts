/** @format */

import { writable } from 'svelte/store';
import type { Persistable, PersistableStoreInit } from '../types';

/**
 * Create a **persistent** `Writable` Svelte store. All changes to the store are synced with the
 * selected storage. On instantiation, the store is created with the value persisted in the selected storage or the
 * value provided as argument.
 *
 * @template T - generic type of the value to store
 * @param { T } value - the initial value to pass to the store
 * @param { string } identifier - the identifier to use as key for the storage
 * @param { PersistableStoreInit } [init] - Optional configuration for the store
 * @returns { Persistable<T> } the created `Writable` store with an added `clear()` method.
 */

export const persistable = <T>(value: T, identifier: string, init?: PersistableStoreInit): Persistable<T> => {
    const { storage, namespace } = init ?? { storage: 'localStorage' };
    const storageId = namespace ? `${namespace}:${identifier}` : identifier;
    const existing = JSON.parse(window[storage].getItem(storageId) ?? 'null');

    const { set, update, subscribe } = writable<T>(existing || value);

    const clear = () => {
        window[storage].removeItem(storageId);
    };

    subscribe((value) => {
        window[storage].setItem(storageId, JSON.stringify(value));
    });

    return { set, update, subscribe, clear };
};
