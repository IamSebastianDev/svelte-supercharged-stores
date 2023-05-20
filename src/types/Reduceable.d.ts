/** @format */

import type { Writable } from 'svelte/store';
import type { Action } from './Action';

/**
 * Persistable interface for persisting a value in local- or session storage.
 */
export interface Reduceable<T, Actions extends string> extends Writable<T> {
    dispatch: <Type extends Actions, Payload>(action: Action<Type, Payload>) => void;
}
