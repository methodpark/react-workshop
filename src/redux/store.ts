import { configureStore } from "@reduxjs/toolkit";

import climateReducer from './climateSlice';

export const createStore = () => configureStore({
    reducer: {
        climate: climateReducer
    }
});

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
