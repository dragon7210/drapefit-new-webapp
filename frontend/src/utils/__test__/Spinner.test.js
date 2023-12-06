import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { expect } from 'chai';

import Spinner from 'utils/Spinner';

afterEach(cleanup);

describe('Spinner component', () => {
  it('renders the spinner', () => {
    const { getByTestId } = render(<Spinner />);
    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});
