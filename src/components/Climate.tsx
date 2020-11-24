import React, { useEffect } from 'react'
import { Sensor } from '../lib/Sensor';
import ClimateValue from './ClimateValue';

type ClimateProps = { sensor: Sensor };

function Climate({ sensor }: ClimateProps) {
  useEffect(() => {
    // runs at creation and on each update, but that's fine (see below)
    console.log('registering even listeners in <Climate>');
    sensor.on('temperature', t => console.log(`temperature: ${t}`));
    sensor.on('humidity',    h => console.log(`humidity:    ${h}`));

    // this runs when the component is unmounted
    return () => {
      console.log('clearing ALL event listeners (<Climate>)');
      sensor.clearListeners();
    }
  }); // no deps array; then only thing that could change here is the sensor
      // prop, and if that changes, we actually do want to unsub + sub again

  return (
    <>
      <ClimateValue
        title='Temperature'
        event='temperature'
        sensor={sensor}
      />

      <ClimateValue
        title='Humidity'
        event='humidity'
        sensor={sensor}
      />
    </>
  );
}

export default Climate;
