# Assignment 5: Redux Toolkit

In this assignment, we'll add the connection between React and Redux.

## 5.1 Refactor to Redux Toolkit

You may have noticed that you had to write quite some boilerplate code in
the previous assignment. We'll clean that up now by introducing *Redux Toolkit*!

Use the `createSlice` API to create all those action creators, initial state,
and the reducer at once.

Don't forget to add a `default export` of the slice's reducer, and named
`export`s for the actions and selectors (if you have any).

The functionality should not change. Use your existing unit tests to verify
this. You probably will need to adapt the test code a bit, but that should be
limited to the naming of the exports. The test logic will stay the same.

## 5.2 Connect React and Redux

To actually make use of the fine Redux state handling logic, we need to connect
it to our React app.

Use *React Toolkit's* `configureStore` to set up the Redux store, and make it
available to the React app via a `<Provider>`.

After that, adapt your component(s) to use the Redux state handling. The *hooks*
`useDispatch` and `useSelector` from the package `react-redux` will help you with that.
