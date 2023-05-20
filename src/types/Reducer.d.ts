/** @format */

import type { Action } from './Action';

/**
 * @description
 * Reducer function to operate on a provided state `T`, using `Actions`.
 */
export interface Reducer<T, Actions extends string> {
    (state: T, action: Action<Actions>): T;
}
