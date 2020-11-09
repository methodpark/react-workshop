import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Header from './Header';

test('loads and displays greeting', async () => {
    render(<Header />)

    expect(screen.getByTestId('header')).toHaveTextContent('Climate');
});