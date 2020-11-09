import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Footer from './Footer';

test('loads and displays greeting', async () => {
    render(<Footer />)

    expect(screen.getByTestId('footer')).toHaveTextContent('1980-2020');
});