import React from 'react'
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
    it('shows the given title', () => {
        const givenTitle = "Test Header";
        const { getByRole } = render(<Header title={givenTitle} />);

        expect(getByRole('heading')).to.have.text(givenTitle);
    });
});
