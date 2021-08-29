import React from 'react'
import { Provider } from 'react-redux';
import { render, RenderResult } from '@testing-library/react';

import { testSensor } from '../lib/Sensor';
import { createStore } from '../redux/store';
import ConnectSensor from './ConnectSensor';
import Quality from './Quality';

describe('Quality component', () => {
    const renderWithStore = () => render(
        <Provider store={createStore()}>
            <ConnectSensor sensor={testSensor}>
                <Quality />
            </ConnectSensor>
        </Provider>);

    let component: RenderResult;

    beforeEach(async () => {
        component = renderWithStore();
    });

    it('has a header', () => {
        expect(component.getByRole('heading')).to.have.text('Quality');
    });

    describe('Temperature', () => {
        const findTemperature = async () => {
            const listEntry = (await component.findByText(/Temperature/)).parentElement;
            return listEntry?.textContent;
        }

        it('shows "-" when no value has been emitted yet', async () => {
            expect(await findTemperature()).to.contain('-');
        });

        const testCases = [
            { value: -10 , expected: "🥶 cold"   },
            { value: 15  , expected: "🥶 cold"   },
            { value: 17  , expected: "🥶 cold"   },
            { value: 17.1, expected: "😀 normal" },
            { value: 20  , expected: "😀 normal" },
            { value: 24.9, expected: "😀 normal" },
            { value: 25  , expected: "🥵 hot"    },
            { value: 100 , expected: "🥵 hot"    },
        ];

        testCases.forEach(({ value, expected }) => {
            it(`shows "${expected}" after a value of ${value}° C has been emitted`, async () => {
                testSensor.emit('temperature', value);
                expect(await findTemperature()).to.contain(expected);
            });
        });
    });

    // Humidity left as an exercise for the reader
});
