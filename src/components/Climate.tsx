import React from 'react'
import { Sensor } from '../lib/Sensor';
import ClimateValue from './ClimateValue';

type ClimateProps = { sensor: Sensor };

function Climate({ sensor }: ClimateProps) {
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
