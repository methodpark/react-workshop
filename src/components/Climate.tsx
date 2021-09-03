import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Sensor } from '../lib/Sensor';
import { selectHumidity, selectTemperature, updateHumidity, updateTemperature } from '../redux/climateSlice';
import Value from './Value';

type ClimateProps = { sensor: Sensor };

function Climate({ sensor }: ClimateProps) {
  const dispatch          = useDispatch();
  const temperatureValues = useSelector(selectTemperature);
  const humidityValues    = useSelector(selectHumidity);

  useEffect(() => {
    sensor.on('temperature', value => dispatch(updateTemperature(value)));
    sensor.on('humidity',    value => dispatch(updateHumidity(value)));

    return () => sensor.clearListeners();
  }, [sensor, dispatch]);

  return (
    <div>
      <Value
        id="temperature"
        title="Temperature"
        values={temperatureValues}
        unit="° C"
      ></Value>

      <Value
        id="humidity"
        title="Humidity"
        values={humidityValues}
        unit=" %"
      ></Value>
    </div>
  );
}

export default Climate;
