/** @format */

import { Writable, writable } from 'svelte/store';
import { Action, Reduceable, Reducer } from '../types';

/**
 * Function that will create a `Reduceable` store that contains a `dispatch` method. The method
 * will take an Object containing a `type` and a `payload` property. Both properties as well as the
 * state of the store will be passed to the reducer.
 *
 * @template T - The state to operate on.
 * @template Actions - A union type of accepted action types.
 * @param { Reducer<T, Actions> } reducer - The `Reducer` function operating on the stored state when
 * the dispatch method is used.
 *
 * @returns { Reduceable<T, Actions> } a extended `Writable` store containing a `dispatch` method to update the internal state.
 */

export const reduceable = <T, Actions extends string>(
    initialState: T,
    reducer: Reducer<T, Actions>
): Reduceable<T, Actions> => {
    const store = writable<T>(initialState);
    const { update } = store;

    const dispatch = <Type extends Actions, Payload>({ type, payload }: Action<Type, Payload>) =>
        update((state) => reducer(state, { type, payload }));

    return { ...store, update, dispatch };
};
