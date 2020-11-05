import React from 'react'

import { ClimateTuple } from './Climate'

type ValueProps = {
    title: string,
    data: ClimateTuple,
};

function Value(props: ValueProps) {
    return (
        <div>
            <h2>{props.title}</h2>
            <span>min: {props.data.min.toFixed(2)}</span><br />
            <span> {props.data.current.toFixed(2)} </span><br />
            <span>max: {props.data.max.toFixed(2)}</span>
        </div>
    );
}

export default Value;