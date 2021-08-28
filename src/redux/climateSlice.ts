import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface CurMinMax {
    current: number | null;
    minimum: number | null;
    maximum: number | null;
}

export interface ClimateState {
    temperature: CurMinMax;
    humidity:    CurMinMax;
}

const initialState: ClimateState = {
    temperature: { current: null, minimum: null, maximum: null },
    humidity:    { current: null, minimum: null, maximum: null }
};

const climateSlice = createSlice({
    name: 'climate',
    initialState,
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
        }
    }
});

export const {
    resetTemperature,
    resetHumidity,
    updateTemperature,
    updateHumidity
} = climateSlice.actions;

export const selectTemperature = (state: RootState) => state.climate.temperature;
export const selectHumidity    = (state: RootState) => state.climate.humidity;

export default climateSlice.reducer;
