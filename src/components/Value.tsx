import React, { useState } from 'react';

interface ValueProps {
    id: string;
    title: string;
    value: number | null;
    unit: string;
}

function Value({ id, title, value, unit }: ValueProps) {
    const [minimum, setMinimum] = useState<number | null>(null);
    const [maximum, setMaximum] = useState<number | null>(null);

    if (value !== null) {
        if (minimum === null || value < minimum) {
            setMinimum(value);
        }
        if (maximum === null || value > maximum) {
            setMaximum(value);
        }
    }

    function reset() {
        setMinimum(value);
        setMaximum(value);
    }

    return (
        <div id={id}>
            <h2>{title}</h2>
            <ul>
                <ListEntry title="Current" unit={unit} value={value}></ListEntry>
                <ListEntry title="Minimum" unit={unit} value={minimum}></ListEntry>
                <ListEntry title="Maximum" unit={unit} value={maximum}></ListEntry>
            </ul>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

type ListEntryProps = Omit<ValueProps, 'id'>;

function ListEntry({ title, value, unit }: ListEntryProps) {
    const formattedValue = value
        ? `${Math.round(value * 10) / 10}${unit}`
        : '-';

    return <li><strong>{title}:</strong> {formattedValue}</li>;
}

export default Value;
