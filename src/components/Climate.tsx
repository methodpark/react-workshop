import React, { Component } from 'react'
import { Sensor } from '../lib/Sensor';

import Header from './Header';
import Footer from './Footer';
import Value from './Value';

import { ClimateState, ClimateTuple } from '../state/climate';

type ClimateProps = { sensor: Sensor };

function updateTuple(currentValue: number, given?: ClimateTuple): ClimateTuple {
  return {
    min: Math.min(given?.min || Infinity, currentValue),
    current: currentValue,
    max: Math.max(given?.max || -Infinity, currentValue)
  };
}

class Climate extends Component<ClimateProps, ClimateState> {
  state: ClimateState = {
    temperature: updateTuple(20),
    humidity: updateTuple(50)
  };

  componentDidMount() {
    this.props.sensor.on('temperature', temperature => this.updateTemperature(temperature));
    this.props.sensor.on('humidity', humidity => this.updateHumidity(humidity));
  }

  componentWillUnmount() {
    this.props.sensor.clearListeners();
  }

  updateTemperature(temperature: number) {
    this.setState({
      temperature: updateTuple(temperature, this.state.temperature)
    });
  }

  updateHumidity(humidity: number) {
    this.setState({
      humidity: updateTuple(humidity, this.state.humidity)
    });
  }

  reset() {
    this.setState({
      temperature: updateTuple(20),
      humidity: updateTuple(50),
    });
  }

  render() {
    return (
      <div>
        <Header />

        <Value data={this.state.temperature} title="temperature" />
        <Value data={this.state.humidity} title="humidity" />

        <button onClick={() => this.reset()}>Reset</button>

        <Footer />
      </div>
    );
  }
}

export default Climate;