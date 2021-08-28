import React, { useEffect, useState } from 'react';
import { Sensor } from '../lib/Sensor';
import Value from './Value';

type ClimateProps = { sensor: Sensor };

function Climate({ sensor }: ClimateProps) {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);

  useEffect(() => {
    sensor.on('temperature', setTemperature);
    sensor.on('humidity', setHumidity);

    return () => sensor.clearListeners();
  }, [sensor]);

  return (
    <div>
      <Value
        id="temperature"
        title="Temperature"
        value={temperature}
      ></Value>

      <Value
        id="humidity"
        title="Humidity"
        value={humidity}
      ></Value>
    </div>
  );
}

export default Climate;
