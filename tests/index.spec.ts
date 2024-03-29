/** @format */

import test from 'ava';

import { reduceable, persistable, asyncReadable } from '../src/lib';
import { get } from 'svelte/store';
import { Reducer } from '../src/types';
import { createMockStorage, noop } from './_test.utils';

// local storage mock
test.before(() => {
    createMockStorage();
});
test.afterEach((t) => {
    window.localStorage.removeItem('test-store');
});

test('Reduceable dispatches action correctly', (t) => {
    // Define your initial state and reducer
    const initialState = { count: 0 };
    const reducer: Reducer<{ count: number }, 'INCREMENT' | 'DECREMENT'> = (state, action) => {
        switch (action.type) {
            case 'INCREMENT':
                return { ...state, count: state.count + 1 };
            case 'DECREMENT':
                return { ...state, count: state.count - 1 };
            default:
                return state;
        }
    };

    // Create the reduceable store
    const store = reduceable(initialState, reducer);

    // Dispatch actions and assert the state changes
    store.dispatch({ type: 'INCREMENT' });
    t.deepEqual(get(store), { count: 1 });

    store.dispatch({ type: 'DECREMENT' });
    t.deepEqual(get(store), { count: 0 });
});

test('Reduceable returns the initial state', (t) => {
    const initialState = { count: 0 };
    const reducer: Reducer<{ count: number }, 'INCREMENT' | 'DECREMENT'> = (state, action) => {
        switch (action.type) {
            case 'INCREMENT':
                return { ...state, count: state.count + 1 };
            case 'DECREMENT':
                return { ...state, count: state.count - 1 };
            default:
                return state;
        }
    };

    const store = reduceable(initialState, reducer);
    t.deepEqual(get(store), initialState);
});

test('Reduceable ignores unknown action', (t) => {
    const initialState = { count: 0 };
    const reducer: Reducer<{ count: number }, 'INCREMENT' | 'DECREMENT'> = (state, action) => {
        switch (action.type) {
            case 'INCREMENT':
                return { ...state, count: state.count + 1 };
            case 'DECREMENT':
                return { ...state, count: state.count - 1 };
            default:
                return state;
        }
    };

    const store = reduceable(initialState, reducer);
    ///@ts-expect-error
    store.dispatch({ type: 'UNKNOWN' });
    t.deepEqual(get(store), initialState); // State should remain unchanged
});

test('Reduceable updates state correctly with payload', (t) => {
    const initialState = { count: 0 };
    const reducer: Reducer<{ count: number }, 'ADD'> = (state, action) => {
        if (action.type === 'ADD') {
            return { ...state, count: state.count + action.payload };
        }
        return state;
    };

    const store = reduceable(initialState, reducer);
    store.dispatch({ type: 'ADD', payload: 5 });
    t.deepEqual(get(store), { count: 5 }); // State should be updated with the payload value
});

test('Persistable store saves initial value to storage', (t) => {
    const initialValue = { count: 0 };
    const identifier = 'test-store';

    // Create the persistable store
    const store = persistable(initialValue, identifier);

    // Check if the initial value is saved to storage
    const storedValue = JSON.parse(window.localStorage.getItem(identifier) ?? 'null');
    t.deepEqual(storedValue, initialValue);

    // Clean up after the test
    window.localStorage.removeItem(identifier);
});

test('Persistable store retrieves value from storage', (t) => {
    const initialValue = { count: 0 };
    const identifier = 'test-store';

    // Save a value to storage
    const storedValue = { count: 5 };
    window.localStorage.setItem(identifier, JSON.stringify(storedValue));

    // Create the persistable store
    const store = persistable(initialValue, identifier);

    // Check if the stored value is retrieved from storage
    t.deepEqual(get(store), storedValue);

    // Clean up after the test
    window.localStorage.removeItem(identifier);
});

test('Persistable store updates value in storage', (t) => {
    const initialValue = { count: 0 };
    const identifier = 'test-store';

    // Create the persistable store
    const store = persistable(initialValue, identifier);

    // Update the value in the store
    const updatedValue = { count: 10 };
    store.set(updatedValue);

    // Check if the updated value is saved to storage
    const storedValue = JSON.parse(window.localStorage.getItem(identifier) ?? 'null');
    t.deepEqual(storedValue, updatedValue);

    // Clean up after the test
    window.localStorage.removeItem(identifier);
});

test('Persistable store clears value from storage', (t) => {
    const initialValue = { count: 0 };
    const identifier = 'test-store';

    // Create the persistable store
    const store = persistable(initialValue, identifier);

    // Clear the value from the store
    store.clear();

    // Check if the value is removed from storage
    const storedValue = window.localStorage.getItem(identifier);
    t.is(storedValue, null);
});

test('asyncReadable should set loading to true while executing the handler', async (t) => {
    const mockHandler = async () => {
        // Simulate an asynchronous operation
        await new Promise((resolve) => setTimeout(resolve, 100));
        return 'result';
    };

    const { loading, data } = asyncReadable(mockHandler);
    data.subscribe(noop);

    t.true(get(loading)); // Assert that loading is initially true

    await new Promise((resolve) => setTimeout(resolve, 200)); // Wait for the handler to complete

    t.false(get(loading)); // Assert that loading is false after the handler completes
});

test('asyncReadable should set data when the handler resolves successfully', async (t) => {
    const expectedResult = 'result';
    const mockHandler = async () => expectedResult;

    const { data } = asyncReadable(mockHandler);
    data.subscribe(noop);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for the handler to complete

    t.is(get(data), expectedResult); // Assert that the data is set to the expected result
});

test('asyncReadable should set error when the handler rejects', async (t) => {
    const expectedError = new Error('Some error');
    const mockHandler = async () => {
        throw expectedError;
    };

    const { error, data } = asyncReadable(mockHandler);
    data.subscribe(noop);

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for the handler to complete

    t.is(get(error), expectedError); // Assert that the error is set to the expected error object
});
