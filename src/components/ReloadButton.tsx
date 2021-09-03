import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReloadThunk, selectReload } from '../redux/climateSlice';

function ReloadButton() {
    const dispatch = useDispatch();
    const reload = useSelector(selectReload);

    return (
        <div className="center">
            <button
                onClick={() => dispatch(createReloadThunk())}
                disabled={reload.state === 'InProgress'}
            >
                Reload
            </button>
            {reload.error && <div className='error'>{reload.error}</div>}
        </div>
    );
}

export default ReloadButton;
