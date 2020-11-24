import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import React from 'react'

import { testSensor } from '../lib/Sensor';

import Climate from './Climate';

test('Climate app shows the current temperature', async () => {
    // It's important to use `testSensor` for the tests, instead of the "real"
    // sensor used in the app. There are two reasons for this:
    // 1. Performance: the real sensor emits data after delayed timeouts,
    //    which would slow down our tests.
    // 2. Predictability: the real sensor generates random values, which is
    //    almost impossible to test. We need to control the emitted values.
    const { findByTestId } = render(<Climate sensor={testSensor} />);

    // No value from the sensor yet, so "-" is shown.
    expect(await findByTestId('temperature-cur')).toHaveTextContent('-');

    // We let the sensor emit a temperature value of 21:
    testSensor.emit('temperature', 21);

    // Let's check if that 21 is actually rendered.
    // We need to use `findBy…` and `await` that, because the event loop needs
    // to run first, so that our emitted event from above actually reaches the
    // component.
    expect(await findByTestId('temperature-cur')).toHaveTextContent('21');

    // Same thing again with a different temperature value, so that we can be
    // sure that the shown values are always up to date with the latest emitted
    // value from the sensor.
    testSensor.emit('temperature', 22);
    expect(await findByTestId('temperature-cur')).toHaveTextContent('22');
});

test('Climate app shows the current humidity', async () => {
    const { findByTestId } = render(<Climate sensor={testSensor} />);

    testSensor.emit('humidity', 21);

    expect(await findByTestId('humidity-cur')).toHaveTextContent('21');

    testSensor.emit('humidity', 22);
    expect(await findByTestId('humidity-cur')).toHaveTextContent('22');
});

test('Climate app shows the minimum humidity', async () => {
    const { findByTestId } = render(<Climate sensor={testSensor} />);

    testSensor.emit('humidity', 21);

    expect(await findByTestId('humidity-min')).toHaveTextContent('21');

    testSensor.emit('humidity', 22);
    expect(await findByTestId('humidity-min')).toHaveTextContent('21');

    testSensor.emit('humidity', 17);
    expect(await findByTestId('humidity-min')).toHaveTextContent('17');
});

test('Reset temperature button does its thing', async () => {
    const { findByRole, findByTestId } = render(<Climate sensor={testSensor} />);

    testSensor.emit('temperature', 21);
    expect(await findByTestId('temperature-min')).toHaveTextContent('21');

    testSensor.emit('temperature', 17);
    expect(await findByTestId('temperature-min')).toHaveTextContent('17');

    testSensor.emit('temperature', 22);
    expect(await findByTestId('temperature-min')).toHaveTextContent('17');

    const button = await findByRole('button', { name: /reset temperature min\/max/i });
    userEvent.click(button);

    expect(await findByTestId('temperature-min')).toHaveTextContent('22');

    testSensor.emit('temperature', 19);
    expect(await findByTestId('temperature-min')).toHaveTextContent('19');
});
