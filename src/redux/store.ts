import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import climateReducer from './climateSlice';

export const createStore = () => configureStore({
    reducer: {
        climate: climateReducer
    }
});

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,    // what the thunk returns (by default void)
  RootState,     // type of the full store, derived above
  unknown,       // extra argument, we don't need that
  Action<string> // type of a Redux action (string is the type)
>;
