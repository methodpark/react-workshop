import React, { Component } from 'react'
import { Sensor } from '../lib/Sensor';
import ClimateValue from './ClimateValue';

type ClimateProps = { sensor: Sensor };

class Climate extends Component<ClimateProps> {
  render() {
    return (
      <div>
        <ClimateValue
          title='Temperature'
          event='temperature'
          sensor={this.props.sensor}
        />

        <ClimateValue
          title='Humidity'
          event='humidity'
          sensor={this.props.sensor}
        />
      </div>
    );
  }
}

export default Climate;
