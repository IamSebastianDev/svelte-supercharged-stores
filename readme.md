<!-- @format -->

# Svelte Supercharged Stores 🚀

[![Npm package version](https://badgen.net/npm/v/@iasd/svelte-supercharged-stores)](https://www.npmjs.com/package/@iasd/svelte-supercharged-stores)[![Npm package total downloads](https://badgen.net/npm/dt/@iasd/svelte-supercharged-stores)](https://npmjs.com/package/@iasd/svelte-supercharged-stores)[![Npm package license](https://badgen.net/npm/license/@iasd/svelte-supercharged-stores)](https://npmjs.com/package/@iasd/svelte-supercharged-stores)[![Github tag](https://badgen.net/github/tag/iamsebastiandev/svelte-supercharged-stores)](https://github.com/iamsebastiandev/flotsam/svelte-supercharged-stores)

## Overview

Svelte Supercharged Stores introduces new types of custom `Stores` to the [https://svelte.dev](Svelte) ecosystem.

## Installing

Install the stores via `yarn` or `npm` by running the following command.

```bash
yarn add @iasd/svelte-supercharged-stores
# or use npm
npm install @iasd/svelte-supercharged-stores
```

## `Persistable`

The `persistable` store creates a store that persists between sessions, using local- or session storage.

```html
<script>
    import { persistable } from '@iasd/svelte-supercharged-stores';

    // create the optional config object

    const init = {
        namespace: 'string',
        storage: 'localStorage' | 'sessionStorage',
    };

    // To create a persistant value, pass a value to persist and a identifier string.
    // Everytime the value is created, it will check the storage for a value and set
    // the svelte store accordingly.
    const store = persistable(0, 'persistant', init);
</script>
```

After creating the persistable, the store can be used like any other Svelte store.

The optional `init` config object can be used to control the persistable store (or more) by providing access to a `namespace` property as well as giving control over the kind of storage interface to use.

> Note: The storeInit object should ideally be used to configure multiple persistable stores to use the same method and namespace.

After creating the store once, the store will automatically keep the localStorage or sessionStorage in sync. This means, that even after reloading, the store will initalize with the value stored in the chosen storage.

## `Reduceable`

The `reduceable` store adds a reducer pattern to a `Writable` store. This can be used to update the store in a more systematic fashion if so desired. To update the values of the store, define a `Reducer` function and pass it to the store.

```html
<script>
	import { reduceable } from "@iasd/svelte-supercharged-stores"

	// Create a basic reducer

	type State = { count: number };
	type Actions = 'increment' | 'decrement';

	const initialState: State = { count: 0 }
	const reducer: Reducer<State, Actions> = (state, { type, payload }) => {
		switch(type){
			case 'increment':
				return { ...state, count: state.count + payload};
			case 'decrement':
				return { ...state, count: state.count - payload}
			default:
				return { ...state }
		}
	}

	// define the reducer store
	const store = reduceable<State, Actions>(initialState, reducer);
</script>


<!--
	Use the reducer store by using the new `dispatch` method of the reduceable store
	For example, the buttons below will increment the value by 5 or 1, depending on which
	button is pressed.
-->

<h1>Current value: {$store}</h1>
<button on:click={(ev) => store.dispatch({type: 'increment', payload: 1})}>Increase by 1</button>
<button on:click={(ev) => store.dispatch({type: 'increment', payload: 5})}>Increase by 5</button>
```

> Note: While the example above is very basic, a `reduceable` store comes in handy when using it with more complex states/stores. The usual reducer pattern you are used to apply.

The `Reducer` function will always receive a snapshot of the current store and the action object passed to the dispatch method.

## Contributing

If you would like to contribute, take a look at the [contribution guide](./contributing.md).

## 📋 License

@iasd/svelte-supercharged-stores is licensed under the [MIT License](https://opensource.org/licenses/MIT).
