/** @format */

import { Writable, writable } from 'svelte/store';

/**
 * A utility method to assert that a given value is a store. If the value is not
 * already a writable, a new writable is initalized with the given value as
 * inital value.
 *
 * @param {any | Writable } value - the value to assert/wrap
 * @returns { Writable } the existing or newly created writable
 */

export const assertStore = (value: any | Writable<any>): Writable<any> =>
	value.hasOwnProperty('update') && value.hasOwnProperty('set')
		? value
		: writable(value);
