import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { sensor } from './lib/Sensor';
import Climate from './components/Climate';

import { climateSlice } from './state/climate';

import './index.css';

const { setTemperature, setHumidity } = climateSlice.actions;

const store = configureStore({
    reducer: climateSlice.reducer
});

sensor.on('temperature', temperature => store.dispatch(setTemperature(temperature)));
sensor.on('humidity', humidity => store.dispatch(setHumidity(humidity)));

ReactDOM.render(
    <Provider store={store}>
        <Climate />
    </Provider>,
    document.getElementById('root')
);
