import React from 'react'
import { useDispatch } from 'react-redux';

import { climateSlice } from '../state/climate';

function ResetButton() {
    const dispatch = useDispatch();

    return <button onClick={() => dispatch(climateSlice.actions.reset())}>Reset</button>
}

export default ResetButton;