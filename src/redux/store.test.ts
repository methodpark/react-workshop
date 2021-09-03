import { createInitialClimateState, resetHumidity, resetTemperature, selectHumidity, selectTemperature, updateHumidity, updateTemperature } from './climateSlice';
import { createStore } from './store';

describe('Redux store', () => {
    let store: ReturnType<typeof createStore>;

    beforeEach(() => {
        store = createStore();
    });

    const getTemperature = () => selectTemperature(store.getState());
    const getHumidity    = () => selectHumidity(store.getState());

    it('should have a defined initial state', () => {
        const expectedState = {
            climate: createInitialClimateState()
        };

        expect(store.getState()).to.deep.equal(expectedState);
    });

    describe('resetTemperature', () => {
        it('should set minimum and maximum to the current temperature', () => {
            store.dispatch(updateTemperature(20));
            store.dispatch(updateTemperature(17));
            store.dispatch(updateTemperature(19));
            store.dispatch(resetTemperature());

            expect(getTemperature()).to.include({ minimum: 19, maximum: 19 });
        });
    });

    describe('resetHumidity', () => {
        it('should set minimum and maximum to the current humidity', () => {
            store.dispatch(updateHumidity(44));
            store.dispatch(updateHumidity(66));
            store.dispatch(updateHumidity(55));
            store.dispatch(resetHumidity());

            expect(getHumidity()).to.include({ minimum: 55, maximum: 55 });
        });
    });

    describe('updateTemperature', () => {
        it('should update the current temperature', () => {
            store.dispatch(updateTemperature(23.42));

            expect(getTemperature()).to.include({ current: 23.42 });
        });

        it('should update the minimum temperature', () => {
            store.dispatch(updateTemperature(20));
            store.dispatch(updateTemperature(17));
            store.dispatch(updateTemperature(19));

            expect(getTemperature()).to.include({ minimum: 17 });
        });

        it('should update the maximum temperature', () => {
            store.dispatch(updateTemperature(20));
            store.dispatch(updateTemperature(25));
            store.dispatch(updateTemperature(23));

            expect(getTemperature()).to.include({ maximum: 25 });
        });
    });

    describe('updateHumidity', () => {
        it('should update the current humidity', () => {
            store.dispatch(updateHumidity(23.42));

            expect(getHumidity()).to.include({ current: 23.42 });
        });

        it('should update the minimum humidity', () => {
            store.dispatch(updateHumidity(20));
            store.dispatch(updateHumidity(17));
            store.dispatch(updateHumidity(19));

            expect(getHumidity()).to.include({ minimum: 17 });
        });

        it('should update the maximum humidity', () => {
            store.dispatch(updateHumidity(20));
            store.dispatch(updateHumidity(25));
            store.dispatch(updateHumidity(23));

            expect(getHumidity()).to.include({ maximum: 25 });
        });
    });
});
