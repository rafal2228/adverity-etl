import React from 'react';
import { Main } from './Main';
import { render, screen } from '@testing-library/react';

describe('Main Component', () => {
  it('Should render message if data set is empty', () => {
    render(<Main data={[]} />);

    expect(
      screen.getByText('No data found, try changing your filters')
    ).toBeInTheDocument();
  });
});
