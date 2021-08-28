import React from 'react';
import { sensor } from '../lib/Sensor';
import Climate from './Climate';
import Footer from './Footer';
import Header from './Header';

function App() {
    return (
        <>
            <header>
                <Header title="Climatron 2000 Professional"></Header>
            </header>
            <main>
                <Climate sensor={sensor}></Climate>
            </main>
            <footer>
                <Footer companyName="Evil Climate Corp" year={2084}></Footer>
            </footer>
        </>
    );
}

export default App;
