import React from 'react'
import { useSelector } from 'react-redux';

import { selectHumidity, selectTemperature } from '../state/climate';

import Header from './Header';
import Footer from './Footer';
import Value from './Value';
import LoadButton from './LoadButton';
import ResetButton from './ResetButton';

function Climate() {
  const temperature = useSelector(selectTemperature);
  const humidity = useSelector(selectHumidity);

  return (
    <div>
      <Header />

      <Value data={temperature} title="temperature" />
      <Value data={humidity} title="humidity" />

      <hr />

      <ResetButton /> <LoadButton />

      <Footer />
    </div>
  );
}

export default Climate;