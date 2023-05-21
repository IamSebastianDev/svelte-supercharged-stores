/** @format */

import { AsyncReadable } from '../types';
import { readable, readonly, writable } from 'svelte/store';

/**
 * @description
 * Create a `AsyncReadable` store that holds stores for the `loading`, `error` & `data` states
 * of a async handler.
 *
 * @template Result - the Result of the handler that will make up the data store returned
 * @param { () => Promise<Result> } handler
 * @returns the created `AsyncReadable` store containing the loading, error and data stores.
 *
 * @example
 * ```ts
 * import { asyncReadable } from "@iasd/svelte-supercharged-stores";
 * const { loading, error, data } = asyncReadable(async () => {
 *    return await fetch('api/') // do something asynchronous
 * })
 * ```
 */
export const asyncReadable = <Result>(handler: () => Promise<Result>): AsyncReadable<Result> => {
    const _loading = writable<boolean>(false);
    const _error = writable<Error | null>(null);

    const data = readable<Result | null>(null, (set) => {
        _loading.set(true);
        handler()
            .then((result) => set(result))
            .catch((error) => _error.set(error))
            .finally(() => _loading.set(false));
    });

    return {
        loading: readonly(_loading),
        error: readonly(_error),
        data,
    };
};
