import React, { Component } from 'react'
import { Sensor } from '../lib/Sensor';

import Header from './Header';
import Footer from './Footer';

type ClimateProps = { sensor: Sensor };
type ClimateState = { temperature: number | null, humidity: number | null };

class Climate extends Component<ClimateProps, ClimateState> {
  state: ClimateState = {
    temperature: null,
    humidity: null,
  };

  componentDidMount() {
    this.props.sensor.on('temperature', temperature => this.setState({ temperature }));
    this.props.sensor.on('humidity', humidity => this.setState({ humidity }));
  }

  componentWillUnmount() {
    this.props.sensor.clearListeners();
  }

  render() {
    return (
      <div>
        <Header />

        <div id="temperature">
          Temperature: {this.state.temperature ?? '-'}
        </div>

        <div id="humidity">
          Humidity: {this.state.humidity ?? '-'}
        </div>

        <Footer />
      </div>
    );
  }
}

export default Climate;