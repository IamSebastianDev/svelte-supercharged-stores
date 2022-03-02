/** @format */

import { Writable, writable } from 'svelte/store';

/**
 * A utility method to assert that a given value is a store. Returns true if the value is a store,
 * false if it is not
 *
 * @param {any | Writable } value - the value to assert/wrap
 * @returns { Boolean } the existing or newly created writable
 */

export const assertStore = (value: any | Writable<any>): boolean =>
	value.hasOwnProperty('update') && value.hasOwnProperty('set');
