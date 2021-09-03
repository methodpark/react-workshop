import React from 'react';
import { useDispatch } from 'react-redux';
import { CurMinMax, resetHumidity, resetTemperature } from '../redux/climateSlice';

interface ValueProps {
    id: string;
    title: string;
    values: CurMinMax;
    unit: string;
}

function Value({ id, title, values, unit }: ValueProps) {
    const dispatch = useDispatch();

    function reset() {
        dispatch(resetTemperature());
        dispatch(resetHumidity());
    }

    return (
        <div data-testid={id}>
            <h2>{title}</h2>
            <ul>
                <ListEntry
                    id={id}
                    name="Current"
                    unit={unit}
                    value={values.current}
                ></ListEntry>
                <ListEntry
                    id={id}
                    name="Minimum"
                    unit={unit}
                    value={values.minimum}
                ></ListEntry>
                <ListEntry
                    id={id}
                    name="Maximum"
                    unit={unit}
                    value={values.maximum}
                ></ListEntry>
            </ul>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

interface ListEntryProps {
    id: string;
    name: string;
    value: number | null;
    unit: string;
}

function ListEntry({ id, name, value, unit }: ListEntryProps) {
    const formattedValue = value
        ? `${Math.round(value * 10) / 10}${unit}`
        : '-';

    return (
        <li data-testid={`${id}-${name.toLowerCase()}`}>
            <strong>{name}:</strong> {formattedValue}
        </li>
    );
}

export default Value;
