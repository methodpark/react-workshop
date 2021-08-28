import React, { useState } from 'react';

interface ValueProps {
    id: string;
    title: string;
    value: number | null;
}

function Value({ id, title, value }: ValueProps) {
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
                <li>Current: {value ?? '-'}</li>
                <li>Minimum: {minimum ?? '-'}</li>
                <li>Maximum: {maximum ?? '-'}</li>
            </ul>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

export default Value;
