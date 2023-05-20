/** @format */

/**
 * @description
 * Action used to `dispatch` to a `Reducer`. Contains the type and optional payload.
 */
export type Action<A extends string, P> = {
    /**
     * @type { A extends string }
     * @description
     * Type of action to `dispatch`.
     */
    type: A;
    /**
     * @type { P }
     * @optional
     * @description
     * Optional payload to `dispatch` with the action
     */
    payload?: P;
};
