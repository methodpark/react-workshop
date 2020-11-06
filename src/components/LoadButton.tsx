import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { stateType, selectState, selectErrorMessage } from '../state/retrieval';
import { fetchThunk } from '../lib/thunks';

function LoadButton() {
    const state = useSelector(selectState);
    const errorMessage = useSelector(selectErrorMessage);
    const dispatch = useDispatch();

    let caption: string = 'Reload';

    if (state === stateType.loading) {
        caption = 'Loading...';
    }

    if (state === stateType.error) {
        caption = 'Error: ' + errorMessage;
    }

    function reload() {
        if (state !== stateType.default) {
            console.log('sorry no reloading...');
            return;
        }

        return dispatch(fetchThunk());
    }

    return <button onClick={reload}>{caption}</button>
}

export default LoadButton;