import React, { useEffect, useState } from 'react'
import { Sensor } from '../lib/Sensor';
import ClimateValue from './ClimateValue';

type ClimateProps = { sensor: Sensor };

function Climate({ sensor }: ClimateProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // runs on creation and when a new sensor is passed (see below)
    console.log('registering even listeners in <Climate>');
    sensor.on('temperature', t => console.log(`temperature: ${t}`));
    sensor.on('humidity',    h => console.log(`humidity:    ${h}`));

    // runs when the component is unmounted
    return () => {
      console.log('clearing ALL event listeners (<Climate>)');
      sensor.clearListeners();
    }
  }, [sensor]); // only run this when sensor changes

  return (
    <>
      <button onClick={() => setVisible(!visible)}>
        Show/Hide (mounts/unmounts {'<ClimateValue>'} instances)
      </button>

      {visible && <ClimateValue
        title='Temperature'
        unit='° C'
        event='temperature'
        sensor={sensor}
      />}

      {visible && <ClimateValue
        title='Humidity'
        unit='%'
        event='humidity'
        sensor={sensor}
      />}
    </>
  );
}

export default Climate;
