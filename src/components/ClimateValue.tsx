import React, { Component } from "react";
import { Sensor, SensorEvent } from "../lib/Sensor";

interface ClimateValueProps {
  event: SensorEvent;
  title: string;
  sensor: Sensor;
};

type ClimateValueState = { current: number, min: number, max: number };

class ClimateValue extends Component<ClimateValueProps, ClimateValueState> {
  state: ClimateValueState = {
    current: NaN,
    min: Infinity,
    max: -Infinity,
  };

  componentDidMount() {
    this.props.sensor.on(this.props.event,
        value => {
          const rounded = Math.round(value);
          this.setState({ current: rounded });
          if (rounded > this.state.max) { this.setState({ max: rounded }) };
          if (rounded < this.state.min) { this.setState({ min: rounded }) };
        }
    );
  }

  componentWillUnmount() {
    this.props.sensor.clearListeners();
  }

  render() {
    const safeValue = (value: number) =>
      Number.isFinite(value) ? value.toString() : '-';

    return (
      <div>
        <h2>{this.props.title}</h2>
        <ul>
          <li>Current: {safeValue(this.state.current)}</li>
          <li>Min: {safeValue(this.state.min)}</li>
          <li>Max: {safeValue(this.state.max)}</li>
        </ul>
      </div>
    );
  }
}

export default ClimateValue;
