import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sensor } from '../lib/Sensor';
import { AppThunk, RootState } from './store';

export interface CurMinMax {
    current: number | null;
    minimum: number | null;
    maximum: number | null;
}

export type ReloadState = 'Done' | 'InProgress';

export interface Reload {
    state: ReloadState;
    error: string | null;
}

export interface ClimateState {
    temperature: CurMinMax;
    humidity:    CurMinMax;
    reload:      Reload;
}

export const createInitialClimateState: () => ClimateState = () => ({
    temperature: { current: null, minimum: null, maximum: null },
    humidity:    { current: null, minimum: null, maximum: null },
    reload:      { state: 'Done', error: null }
});

const climateSlice = createSlice({
    name: 'climate',
    initialState: createInitialClimateState(),
    reducers: {
        resetTemperature({ temperature }) {
            temperature.minimum = temperature.current;
            temperature.maximum = temperature.current;
        },
        resetHumidity({ humidity }) {
            humidity.minimum = humidity.current;
            humidity.maximum = humidity.current;
        },
        updateTemperature({ temperature }, { payload }: PayloadAction<number>) {
            const { minimum, maximum } = temperature;
            if (minimum === null || payload < minimum) {
                temperature.minimum = payload;
            }
            if (maximum === null || payload > maximum) {
                temperature.maximum = payload;
            }
            temperature.current = payload;
        },
        updateHumidity({ humidity }, { payload }: PayloadAction<number>) {
            const { minimum, maximum } = humidity;
            if (minimum === null || payload < minimum) {
                humidity.minimum = payload;
            }
            if (maximum === null || payload > maximum) {
                humidity.maximum = payload;
            }
            humidity.current = payload;
        },
        setReload(state, { payload }: PayloadAction<ReloadState>) {
            state.reload.state = payload;
            if (payload === 'InProgress') {
                state.reload.error = null; // new reload can clear old errors
            }
        },
        setReloadError(state, { payload }: PayloadAction<string>) {
            state.reload.error = payload;
        },
    }
});

export const {
    resetTemperature,
    resetHumidity,
    updateTemperature,
    updateHumidity,
    setReload,
    setReloadError
} = climateSlice.actions;

export function createReloadThunk(): AppThunk {
    return async (dispatch) => {
        dispatch(setReload('InProgress'));
        try {
            await Promise.all([
                sensor.getTemperature().then(
                    temp => dispatch(updateTemperature(temp))
                ),
                sensor.getHumidity().then(
                    humidity => dispatch(updateHumidity(humidity))
                ),
            ]);
        } catch (e) {
            dispatch(setReloadError(e.message || 'unknown sensor error'));
        } finally {
            dispatch(setReload('Done'));
        }
    }
}

export const selectTemperature = (state: RootState) => state.climate.temperature;
export const selectHumidity    = (state: RootState) => state.climate.humidity;
export const selectReload      = (state: RootState) => state.climate.reload;

export default climateSlice.reducer;
