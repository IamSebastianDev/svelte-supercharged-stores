/** @format */

import type { Writable } from 'svelte/store';
import { assertStore } from '../internal/assertStore';
export interface Reduceable extends Writable<any> {
	dispatch: Function;
}
export interface Dispatch {
	type: string;
	payload?: any;
}

/**
 * Function that will create a reduceable store that contains a new **dispatch** method. The method
 * will take an Object containing a *type* and a *payload* property. Both properties as well as the
 * state of the store will be passed to the reducer function to do its thing.
 *
 * @param { Function } reducer - The reducer function that will operate on the state. Received a state snapshot
 * as well as the `{ type, payload }` argument of the dispatch method.
 * @param { Writable<any> | any } argument - The store to append the dispatch method to OR the inital value of
 * a newly created writable store. This enables using already created stores as well as simple values.
 * @param { Function? } initalize - A optional function to call after creating/patching the store. Receives
 * the state of the store as argument.
 *
 * @returns { Reduceable } a created/patched writable store containing a dispatch method.
 */

export const reduceable = (
	reducer: Function,
	argument: Writable<any> | any,
	initalize?: Function
): Reduceable => {
	/**
	 * Assert/create the argument as store, depending on what is passed
	 * by the user. This is useful because it allows creating a store
	 * directly as well as passing a already created store.
	 */

	const store = assertStore(argument);
	const { set, subscribe, update } = store;

	// Create the dispatch function using the given update method

	const dispatch = ({ type, payload }: Dispatch) =>
		update((state) => reducer(state, { type, payload }));

	// If a initalize function is passed, use the update method
	// to set the state with the initalizer function

	initalize && update((state) => initalize(state));

	return { set, subscribe, update, dispatch };
};
