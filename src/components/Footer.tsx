
import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <footer data-testid="footer" style={{ fontSize: 10, borderTop: '1px solid black', marginTop: 10, paddingTop: 10 }}>
                (c) 1980-2020 by <i>Sensor</i>
            </footer>
        );
    }
}

export default Footer;