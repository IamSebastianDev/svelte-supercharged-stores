/** @format */

import { AsyncReadable } from '../types';
import { Readable, Writable, derived, readable, readonly, writable } from 'svelte/store';

/**
 * PRIVATE API do not use.
 */
type StoresValues<T> = T extends Readable<infer U>
    ? U
    : {
          [K in keyof T]: T[K] extends Readable<infer U> ? U : never;
      };

/**
 * @description
 * Create a `AsyncReadable` store that holds stores for the `loading`, `error` & `data` states
 * of a async handler.
 *
 * @template Result - the Result of the handler that will make up the data store returned
 * @template Args - any number of `Readable` or `Writable` stores, which when updated will trigger a new execution of the handler function.
 * @param { () => Promise<Result> } handler - async the handler passed to the function. Receives the values of eventual passed stores as argument.
 * @param { ...Args } args - dependencies to pass.
 * @returns the created `AsyncReadable` store containing the loading, error and data stores.
 *
 * @example
 * ```ts
 * import { asyncReadable } from "@iasd/svelte-supercharged-stores";
 * const { loading, error, data } = asyncReadable(async () => {
 *    return await fetch('api/') // do something asynchronous
 * })
 *
 * // with dependencies
 *
 * const id$ = writable(0)
 * const {loading, error, data} = asyncReadable(async(id: number) => {
 *  return await fetch(//Use id here)
 * }, id$)
 * ```
 */
export const asyncReadable = <Result, Args extends (Writable<unknown> | Readable<unknown>)[]>(
    handler: (...args: StoresValues<Args>) => Promise<Result>,
    ...args: Args
): AsyncReadable<Result> => {
    const _loading = writable<boolean>(false);
    const _error = writable<Error | null>(null);

    const data = derived<Args, Result | null>(
        args,
        ($args, set) => {
            _error.set(null);
            _loading.set(true);
            handler(...$args)
                .then((result) => set(result))
                .catch((error) => _error.set(error))
                .finally(() => _loading.set(false));
        },
        null
    );

    return {
        loading: readonly(_loading),
        error: readonly(_error),
        data,
    };
};
