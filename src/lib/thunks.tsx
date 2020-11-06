import { Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'

import { AppState } from '../state/state'
import {sensor} from './Sensor';
import wait from '../lib/wait';

import { climateSlice } from '../state/climate';
import { retrievalSlice } from '../state/retrieval';

const climateActions = climateSlice.actions;
const retrievalActions = retrievalSlice.actions;

type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>

export function fetchThunk(): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(retrievalActions.setLoading());
            const [temperature, humidity] = await Promise.all([
                sensor.getTemperature(),
                sensor.getHumidity(),
            ]);

            dispatch(climateActions.setTemperature(temperature));
            dispatch(climateActions.setHumidity(humidity));

            dispatch(retrievalActions.setDefault());
        } catch (error) {
            dispatch(retrievalActions.setError(error.message));
            await wait(3000);
            dispatch(retrievalActions.setDefault());
        }
    };
}