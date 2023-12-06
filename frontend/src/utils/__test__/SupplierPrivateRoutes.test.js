import React from 'react';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { expect } from 'chai';

import SupplierPrivateRoutes from 'utils/SupplierPrivateRoutes';

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));

describe('SupplierPrivateRoutes', () => {
  it('should render the component when user is present and role is 100 or 107', () => {
    useSelector.mockImplementation(() => ({
      user: { role: 100 }
    }));
    const Component = () => <div>Component</div>;
    const { getByText } = render(<SupplierPrivateRoutes component={Component} />);
    expect(getByText('Component')).toBeInTheDocument();
  });

  it('should navigate to login page when user is not present', () => {
    useSelector.mockImplementation(() => ({
      user: null
    }));
    const { getByTestId } = render(<SupplierPrivateRoutes />);
    expect(getByTestId('navigate-login')).toBeInTheDocument();
  });

  it('should navigate to login page when user is present but role is not 100 or 107', () => {
    useSelector.mockImplementation(() => ({
      user: { role: 200 }
    }));
    const { getByTestId } = render(<SupplierPrivateRoutes />);
    expect(getByTestId('navigate-login')).toBeInTheDocument();
  });
});
