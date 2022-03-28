/** @format */

import { assertStore } from '../internal/assertStore';
import { Writable, writable } from 'svelte/store';

interface Persistable<T> extends Writable<T> {}

interface StoreInit {
	namespace?: string;
	method: 'localStorage' | 'sessionStorage';
}

/**
 * A utility function to create a **persistant** svelte store. All changes to the store are synced with the
 * local storage. On pageload, the store is created with the value existing in the localStorage or the value
 * provided as argument. If a store is passed as an argument, the store itself is instead set to the value.
 * This means svelte custom stores can be persistet easily.
 *
 * @param { Writable<any> } argument - the value/store that is used to initalize the persistable.
 * @param { string } identifier - the identifier used to describe the created store. This value should be unique, but
 * **consistent** between sessions.
 * @param { {} } storeInit - a configuration object used to configure the stores behaviour.
 * @param { 'localStorage' | 'sessionStorage' } storeInit.method - the storage method used for the persistable.
 * Defaults to `localStorage`
 * @param { string? } storeInit.namespace - a optional string argument to prepend before the identfier, followed by two
 * lowercase dashes. This can be used to ensure uniquneness for different applications.
 *
 * @returns { Writable<any> } a Writable (or custom) SvelteStore set to the value found in the local/session storage
 * or provided argument.
 */

export const persistable = <T>(
	argument: Writable<T>,
	identifier: string,
	storeInit: StoreInit = {
		method: 'localStorage',
	}
): Writable<T> => {
	const { method, namespace } = storeInit;
	const storageIdentifier = (namespace ? namespace + '__' : '') + identifier;
	let storedValue = window[method].getItem(storageIdentifier);
	const parsedValue = storedValue && JSON.parse(storedValue);

	const store = writable(parsedValue || argument);

	store.subscribe((state) =>
		window[method].setItem(storageIdentifier, JSON.stringify(state))
	);

	return store;
};
