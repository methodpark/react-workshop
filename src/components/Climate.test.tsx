// import React from 'react'

// import { Sensor } from '../lib/Sensor';
// import { render, screen, waitFor } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'

// import Climate from './Climate';
// import wait from '../lib/wait';

// test('loads and displays greeting', async () => {
//     const sensor = new Sensor(true);
//     render(<Climate />)

//     sensor.emit('temperature', 11.111);
//     sensor.emit('temperature', 33.333);
//     sensor.emit('temperature', 22.222);

//     sensor.emit('humidity', 44.444);
//     sensor.emit('humidity', 66.666);
//     sensor.emit('humidity', 55.555);

//     // sensor emits asynchrounsly
//     await wait();

//     expect(screen.getByTestId('value-temperature')).toHaveTextContent('temperaturemin: 11.11 22.22 max: 33.33');
//     expect(screen.getByTestId('value-humidity')).toHaveTextContent('humiditymin: 44.44 55.55 max: 66.67');
// });
