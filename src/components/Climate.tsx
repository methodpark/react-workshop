import React from 'react';
import { useSelector } from 'react-redux';

import { selectHumidity, selectTemperature } from '../redux/climateSlice';
import Value from './Value';

function Climate() {
    const temperatureValues = useSelector(selectTemperature);
    const humidityValues = useSelector(selectHumidity);

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
