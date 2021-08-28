import React from 'react';

interface ValueProps {
    id: string;
    title: string;
    value: number | null;
}

function Value({ id, title, value }: ValueProps) {

    return (
        <div id={id}>
            {title}: {value ?? '-'}
        </div>
    );
}

export default Value;
