/** @format */

import { writable, Writable } from 'svelte/store';

export interface Action {
	type: string;
	payload?: any;
}

export interface Reduceable<T> extends Writable<T> {
	dispatch(action: Action): void;
}
export interface Reducer {
	<T>(state: T, action: Action): T;
}

/**
 * Function that will create a reduceable store that contains a new **dispatch** method. The method
 * will take an Object containing a *type* and a *payload* property. Both properties as well as the
 * state of the store will be passed to the reducer function to do its thing.
 *
 * @param { Function } reducer - The reducer function that will operate on the state. Received a state snapshot
 * as well as the `{ type, payload }` argument of the dispatch method.
 * @param { Writable<any> } argument - The store to append the dispatch method to OR the inital value of
 * a newly created writable store. This enables using already created stores as well as simple values.
 * @param { Function? } initalize - A optional function to call after creating/patching the store. Receives
 * the state of the store as argument.
 *
 * @returns { Reduceable } a created/patched writable store containing a dispatch method.
 */

export const reduceable = <T>(
	reducer: Reducer,
	store: Writable<T>,
	initalize?: Function
): Reduceable<T> => {
	/**
	 * Assert/create the argument as store, depending on what is passed
	 * by the user. This is useful because it allows creating a store
	 * directly as well as passing a already created store.
	 */

	const { update } = store;

	// Create the dispatch function using the given update method

	const dispatch = ({ type, payload }: Action) =>
		update(<T>(state: T) => reducer(state, { type, payload }));

	// If a initalize function is passed, use the update method
	// to set the state with the initalizer function

	initalize && update(<T>(state: T) => initalize(state));

	return { ...store, dispatch };
};
