/** @format */

import type { Writable } from 'svelte/store';
import { assertStore } from '../internal/assertStore';
interface Reduceable extends Writable<any> {
	dispatch: Function;
}
interface Dispatch {
	type: string;
	payload?: any;
}

/**
 *
 * @param { Function } reducer
 * @param { Writable<any> | any } argument
 * @param { Function } initalize
 * @returns { Reduceable }
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
