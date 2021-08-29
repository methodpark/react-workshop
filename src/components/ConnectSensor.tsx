import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Sensor } from '../lib/Sensor';
import { updateHumidity, updateTemperature } from '../redux/climateSlice';

interface ConnectSensorProps {
    children: React.ReactNode;
    sensor: Sensor;
}

function ConnectSensor({ sensor, children }: ConnectSensorProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        sensor.on('temperature', value => dispatch(updateTemperature(value)));
        sensor.on('humidity',    value => dispatch(updateHumidity(value)));

        return () => sensor.clearListeners();
    }, [sensor, dispatch]);

    return <>{children}</>;
}

export default ConnectSensor;
