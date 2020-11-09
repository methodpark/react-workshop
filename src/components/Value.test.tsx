import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Value from './Value';

test('loads and displays greeting', async () => {
    render(<Value title="test" data={{ min: 1.1111, current: 2.22222, max: 3.3333 }} />)

    expect(screen.getByTestId('value-test')).toHaveTextContent('testmin: 1.11 2.22 max: 3.33');
});