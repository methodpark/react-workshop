import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { climateSlice, selectHumidity, selectTemperature } from '../state/climate';

import Header from './Header';
import Footer from './Footer';
import Value from './Value';

const { reset } = climateSlice.actions

function Climate() {
  const dispatch = useDispatch();
  const temperature = useSelector(selectTemperature);
  const humidity = useSelector(selectHumidity);

  return (
    <div>
      <Header />

      <Value data={temperature} title="temperature" />
      <Value data={humidity} title="humidity" />

      <button onClick={() => dispatch(reset())}>Reset</button>

      <Footer />
    </div>
  );
}

export default Climate;