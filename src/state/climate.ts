export type ClimateTuple = {
    min: number,
    current: number,
    max: number,
}

export type ClimateState = {
    temperature: ClimateTuple,
    humidity: ClimateTuple,
}

export const SET_TEMPERATURE = 'SET_TEMPERATURE';
export const SET_HUMIDITY = 'SET_HUMIDITY';
export const RESET = 'RESET';

export interface SetTemperatureAction {
    type: typeof SET_TEMPERATURE,
    temperature: number,
}

export interface SetHumidityAction {
    type: typeof SET_HUMIDITY,
    humidity: number,
}

export interface ResetAction {
    type: typeof RESET,
}

export function createSetTemperatureAction(temperature: number): SetTemperatureAction {
    return { type: SET_TEMPERATURE, temperature };
}

export function createSetHumidityAction(humidity: number): SetHumidityAction {
    return { type: SET_HUMIDITY, humidity };
}

export function createResetAction(): ResetAction {
    return { type: RESET };
}

const initialState = {
    temperature: _updateTuple(20),
    humidity: _updateTuple(50)
};

type ClimateActions = SetTemperatureAction | SetHumidityAction | ResetAction;

export function reducer(climate: ClimateState = initialState, action: ClimateActions): ClimateState {
    switch (action.type) {
        case SET_TEMPERATURE:
            return {
                ...climate,
                temperature: _updateTuple(action.temperature, climate.temperature)
            };

        case SET_HUMIDITY:
            return {
                ...climate,
                humidity: _updateTuple(action.humidity, climate.humidity)
            };

        case RESET:
            return initialState;

        default:
            return climate;
    }

}

function _updateTuple(currentValue: number, given?: ClimateTuple): ClimateTuple {
    return {
        min: Math.min(given?.min || Infinity, currentValue),
        current: currentValue,
        max: Math.max(given?.max || -Infinity, currentValue)
    };
}