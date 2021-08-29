import React from 'react';
import { Provider } from 'react-redux';
import { sensor } from '../lib/Sensor';
import { store } from '../redux/store';
import Climate from './Climate';
import ConnectSensor from './ConnectSensor';
import Footer from './Footer';
import Header from './Header';
import Quality from './Quality';

function App() {
    return (
        <>
            <header>
                <Header title="Climatron 2000 Professional"></Header>
            </header>
            <main>
                <Provider store={store}>
                    <ConnectSensor sensor={sensor}>
                        <Climate/>
                        <Quality/>
                    </ConnectSensor>
                </Provider>
            </main>
            <footer>
                <Footer companyName="Evil Climate Corp" year={2084}></Footer>
            </footer>
        </>
    );
}

export default App;
