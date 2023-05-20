/** @format */

/**
 * @description
 * Configuration object to set the storage `method` and `namespace`
 * for a `Persistable` store.
 */
export type PersistableStoreInit = {
    /**
     * @type { string }
     * @description
     * A optional string to prepend to the identifier to
     * create a unique namespace.
     */
    namespace?: string;
    /**
     * @type { 'localStorage' | 'sessionStorage' }
     * @description
     * The storage method to use when persisting the value
     */
    storage: 'localStorage' | 'sessionStorage';
};
