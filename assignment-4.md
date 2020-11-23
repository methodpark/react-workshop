# Assignment 4: Application State with Redux

Up to now you have structured your application in a way that holds the state of
the individual components locally. We will now prepare for a global state
handling solution powered by *Redux*.

We'll start out with the state handling itself, *without integrating it into the
React app yet*.

Create the actions and a reducer for everything that can happen in the app:

* temperature changes
* humidity changes
* reset of minimum/maximum values

Even though the *Redux* code is not yet an active part of our app, we can still
verify that it works by writing unit tests for it. Remember that *Redux* is
based on pure functions, which is very convenient in tests: the output is always
fully defined by the input.

Focus on tests for the *reducer*, which takes in some state and an action, and
produces a new state as result from that. Think of various scenarios that can
occur in the app and document them as test code. Starting with some state,
assert the state matches what you'd expect it after an action has been reduced.
