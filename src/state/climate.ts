import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type ClimateTuple = {
    min: number,
    current: number,
    max: number,
}

export type ClimateState = {
    temperature: ClimateTuple,
    humidity: ClimateTuple,
}

const initialState: ClimateState = {
    temperature: _updateTuple(20),
    humidity: _updateTuple(50)
};

function _updateTuple(currentValue: number, given?: ClimateTuple): ClimateTuple {
    return {
        min: Math.min(given?.min || Infinity, currentValue),
        current: currentValue,
        max: Math.max(given?.max || -Infinity, currentValue)
    };
}

const setTemperature: CaseReducer<ClimateState, PayloadAction<number>> = (climate, action) => {
    climate.temperature = _updateTuple(action.payload, climate.temperature);
};

const setHumidity: CaseReducer<ClimateState, PayloadAction<number>> = (climate, action) => {
    climate.humidity = _updateTuple(action.payload, climate.humidity);
};

const reset: CaseReducer<ClimateState> = () => initialState;

export const climateSlice = createSlice({
    name: 'climate',
    initialState,
    reducers: {
        setTemperature,
        setHumidity,
        reset,
    }
});
