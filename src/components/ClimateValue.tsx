import React, { useCallback, useEffect, useState } from "react";
import { Sensor, SensorEvent } from "../lib/Sensor";

interface ClimateValueProps {
  title : string;
  sensor: Sensor;
  event : SensorEvent;
};

type ClimateValueState = { current: number, min: number, max: number };

function ClimateValue({title, sensor, event}: ClimateValueProps) {
  const [state, setState] = useState<ClimateValueState>({
    current: NaN,
    min: Infinity,
    max: -Infinity,
  });

  const update = useCallback(
    (value: number) => {
      const rounded = Math.round(value * 10) / 10;
      setState({
        current: rounded,
        min: (rounded < state.min) ? rounded : state.min,
        max: (rounded > state.max) ? rounded : state.max,
      });
  }, [state.min, state.max]);

  useEffect(() => {
    sensor.on(event, update);
    return () => sensor.off(event, update);
  }, [sensor, event, update]);

  const hideInfinities = (value: number) =>
    Number.isFinite(value) ? value.toString() : '-';

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        <li>Current: {hideInfinities(state.current)}</li>
        <li>Min:     {hideInfinities(state.min)    }</li>
        <li>Max:     {hideInfinities(state.max)    }</li>
      </ul>
    </div>
  );
}

export default ClimateValue;
