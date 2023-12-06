import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';

import InventoryPrivateRoutes from 'utils/InventoryPrivateRoutes';

const mockStore = configureStore([]);

describe('InventoryPrivateRoutes', () => {
  let store = null;
  let component = null;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: { role: 100 }
      }
    });
    const Component = () => <div>Component</div>;
    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <InventoryPrivateRoutes component={Component} />
        </MemoryRouter>
      </Provider>
    );
  });

  it('should render the component when user is logged in and has role 100 or 104', () => {
    expect(component.getByText('Component')).toBeInTheDocument();
  });

  it('should redirect to login page when user is not logged in', () => {
    store = mockStore({
      auth: {
        user: null
      }
    });
    const Component = () => <div>Component</div>;
    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <InventoryPrivateRoutes component={Component} />
        </MemoryRouter>
      </Provider>
    );
    expect(component.getByText('Login')).toBeInTheDocument();
  });
});
