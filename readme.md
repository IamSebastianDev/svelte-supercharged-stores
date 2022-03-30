<!-- @format -->

# Svelte Supercharged Stores 🚀

Svelte Supercharged Stores introduces new types of custom `Stores` to the [https://svelte.dev](Svelte) ecosystem.

## Installing

Install the stores simply via `npm` by running the following command.

```bash
npm i svelte-supercharged-stores
```

## `Persistable`

The `persistable` store creates a store that persists between sessions, using local- or session storage.

```html
<script>
	import { persistable } from 'svelte-supercharged-stores';

	// create the optional config object

	const storeInit = {
		namespace: 'string',
		method: 'localStorage' | 'sessionStorage',
	};

	// To create a persistant value, pass a value to persist and a identifier string.
	// Everytime the value is created, it will check the storage for a value and set
	// the svelte store accordingly.
	const persistantValue = persistable(0, 'persistant', storeInit);
</script>
```

After creating the persistable, the store can be used like any other Svelte store.

The optional `storeInit` config object can be used to control the persistable store (or more) by providing access to a `namespace` property as well as giving control over the kind of storage interface to use.

| argument   | argument type | description                                                                                                                                                                                                 |
| ---------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value      | any           | The value to persist                                                                                                                                                                                        |
| identifier | string        | The identifier to be used to save the store                                                                                                                                                                 |
| storeInit? | Object        | Optional object containing a 'method' property to change the used storage interface, as well as a 'namespace' property that can be used to prepared the identifier and used for a global storage namespace. |

> Note: The storeInit object should ideally be used to configure multiple persistable stores to use the same method and namespace.

After creating the store once, the store will automatically keep the localStorage or sessionStorage in sync. This means, that even after reloading, the store will initalize with the value stored in the chosen storage.

## `Reduceable`

The `reduceable` store adds a reducer pattern to the passed (writable) store. This can be used to update the store in a more systematic fashion if so desired. To update the values of the store, define a `Reducer` function and pass it to the store.

```html
<script>
	import { reduceable } from "svelte-supercharged-stores

	// let's consider a reducer that will update the stores value depending
	// on a increase or decrease request by a passed payload value
	// this will make this store very simple to update.

	const reducer = (state, { type, payload }) => {
		let newState

		switch(type){
			case 'increment':
				newState = { count: state.count + payload};
				break;
			case 'decrement':
				newState = { count: state.count - payload}
				break;
		}


		return newState
	}

	// define the reducer store
	const reducedStore = reduceable(reducer, { count: 0 });
</script>


<!--
	Use the reducer store by using the new `dispatch` method of the reduceable store
	For example, the buttons below will increment the value by 5 or 1, depending on which
	button is pressed.
-->

<h1>Current value: {$reducedStore}</h1>
<button on:click={(ev) => reducedStore.dispatch({type: 'increment', payload: 1})}>Increase by 1</button>
<button on:click={(ev) => reducedStore.dispatch({type: 'increment', payload: 5})}>Increase by 5</button>
```

> Note: While the example above is very simple, a reduceable store comes in handy when using it with more complex states/stores. The usual reducer pattern you are used to apply.

The `Reducer` function will always receive a snapshot of the current store and the action object passed to the dispatch method.

| argument   | argument type | description                                                                                           |
| ---------- | ------------- | ----------------------------------------------------------------------------------------------------- |
| reducer    | Function      | The reducer function to use.                                                                          |
| store      | Writable      | The (writable)store to use with the reducer                                                           |
| initalize? | Function      | Optional Function to execute after creating the reducer function. Can be used to initalize the Store. |

## 📋 License

Pangolicons is licensed under the [MIT License](https://opensource.org/licenses/MIT).
