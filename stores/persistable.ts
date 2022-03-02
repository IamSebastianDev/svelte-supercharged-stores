/** @format */

import { assertStore } from '../internal/assertStore';
import { Writable, writable } from 'svelte/store';

interface StoreInit {
	namespace?: string;
	method: 'localStorage' | 'sessionStorage';
}

export const persistable = (
	argument: any | Writable<any>,
	identifier: string,
	storeInit: StoreInit = {
		method: 'localStorage',
	}
): Writable<any> => {
	let store;
	const { method, namespace } = storeInit;
	const storageIdentifier = (namespace ? namespace + '__' : '') + identifier;
	let storedValue = window[method].getItem(storageIdentifier);
	storedValue && JSON.parse(storedValue);

	if (assertStore(argument)) {
		store = argument;
		store.set(storedValue);
	} else {
		store = writable(storedValue || argument);
	}

	store.subscribe((state: any) =>
		window[method].setItem(storageIdentifier, JSON.stringify(state))
	);

	return store;
};
