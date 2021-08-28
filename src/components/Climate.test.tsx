import React from 'react'
import { render } from '@testing-library/react';

import { testSensor } from '../lib/Sensor';
import Climate from './Climate';

describe('Climate component', () => {
    describe('Temperature', () => {
        it('shows the current value', async () => {
            const { findByTestId } = render(<Climate sensor={testSensor} />);
            const findCurrent = () => findByTestId('temperature-current');

            expect(await findCurrent()).to.contain.text('-');

            testSensor.emit('temperature', 21);
            expect(await findCurrent()).to.contain.text('21° C');

            testSensor.emit('temperature', 22.666);
            expect(await findCurrent()).to.contain.text('22.7° C');
        });
    });

    describe('Humidity', () => {
        it('shows the current value', async () => {
            const { findByTestId } = render(<Climate sensor={testSensor} />);
            const findCurrent = () => findByTestId('humidity-current');

            expect(await findCurrent()).to.contain.text('-');

            testSensor.emit('humidity', 60);
            expect(await findCurrent()).to.contain.text('60 %');

            testSensor.emit('humidity', 65.1111);
            expect(await findCurrent()).to.contain.text('65.1 %');
        });
    });
});
