import React, { useCallback, useEffect, useState } from "react";
import { Sensor, SensorEvent } from "../lib/Sensor";

interface ClimateValueProps {
  title : string;
  unit  : string;
  sensor: Sensor;
  event : SensorEvent;
};

type ClimateValueState = { current: number, min: number, max: number };

function ClimateValue({title, unit, sensor, event}: ClimateValueProps) {
  const [state, setState] = useState<ClimateValueState>({
    current: NaN, min: Infinity, max: -Infinity
  });

  const reset = () => setState({
    current: state.current,
    min    : state.current,
    max    : state.current,
  });

  const update = useCallback(
    (value: number) => {
      const rounded = Math.round(value * 10) / 10;
      setState({
        current: rounded,
        min: Math.min(rounded, state.min),
        max: Math.max(rounded, state.max),
      });
  }, [state.min, state.max]);

  useEffect(() => {
    sensor.on(event, update);
    return () => sensor.off(event, update);
  }, [sensor, event, update]);

  const printNumber = (value: number) =>
    Number.isFinite(value) ? `${value}${unit}` : '-';

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        <li>Current: {printNumber(state.current)}</li>
        <li>Min:     {printNumber(state.min)    }</li>
        <li>Max:     {printNumber(state.max)    }</li>
      </ul>
      <button onClick={reset}>
        Reset {title} Min/Max
      </button>
    </div>
  );
}

export default ClimateValue;
