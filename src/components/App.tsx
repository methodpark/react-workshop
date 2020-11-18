import React from "react";

import { sensor } from '../lib/Sensor';
import Header from './Header';
import Climate from './Climate';


export function App() {
    return (
        <>
            <Header text={"Mr. Climate 2000"} />
            <Climate sensor={sensor} />
        </>
    );
}
