import {
    reducer,
    createSetHumidityAction,
    createSetTemperatureAction,
    createResetAction,
    SetTemperatureAction,
} from './climate';

describe('state', () => {
    const givenState = {
        temperature: { min: 20, current: 20, max: 20 },
        humidity: { min: 50, current: 50, max: 50 },
    };

    it('should create a default state', () => {
        expect(reducer(undefined, {} as SetTemperatureAction)).toEqual(givenState);
    });

    describe('temperature', () => {
        it('should update a given state with a higher temperature value', () => {
            const newTemperature = 42;

            const newState = reducer(givenState, createSetTemperatureAction(newTemperature));

            expect(newState).toEqual({
                temperature: { min: 20, current: newTemperature, max: newTemperature },
                humidity: { min: 50, current: 50, max: 50 },
            });
        });

        it('should update a given state with a lower temperature value', () => {
            const newTemperature = 7;

            const newState = reducer(givenState, createSetTemperatureAction(newTemperature));

            expect(newState).toEqual({
                temperature: { min: newTemperature, current: newTemperature, max: 20 },
                humidity: { min: 50, current: 50, max: 50 },
            });
        });
    });

    describe('humidity', () => {
        it('should update a given state with a higher humidity value', () => {
            const newHumidity = 52;

            const newState = reducer(givenState, createSetHumidityAction(newHumidity));

            expect(newState).toEqual({
                temperature: { min: 20, current: 20, max: 20 },
                humidity: { min: 50, current: newHumidity, max: newHumidity },
            });
        });

        it('should update a given state with a lower temperature value', () => {
            const newHumidity = 42;

            const newState = reducer(givenState, createSetHumidityAction(newHumidity));

            expect(newState).toEqual({
                temperature: { min: 20, current: 20, max: 20 },
                humidity: { min: 42, current: 42, max: 50 },
            });
        });
    });

    it('should reset the state', () => {
        const currentState = {
            temperature: { min: 123, current: 456, max: 789 },
            humidity: { min: 1, current: 2, max: 3 }
        };

        expect(reducer(currentState, createResetAction())).toEqual(givenState);
    });
});