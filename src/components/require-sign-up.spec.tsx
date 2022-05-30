import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createTestStore, store as realStore } from '../app/store';
import { signUpAsync } from '../features/sign-up/sign-up.slice';
import { RequireSignUp } from './require-sign-up';
import { SignUpCard } from './signup-card';

jest.mock('@mui/material');
jest.mock('react-router-dom');

describe('RequireSignUp', () => {
  let store: typeof realStore;
  beforeEach(() => {
    store = createTestStore();
  });
  afterEach(() => {
    cleanup();
  });

  it('should try to redirect without a signup status', () => {
    const route = 'mock-route';
    const MockChildren = 'mock-children';

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <RequireSignUp children={<MockChildren />} redirectTo={route} />
        </BrowserRouter>
      </Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display the children with success signup status', () => {
    const route = 'mock-route';
    const MockChildren = 'mock-children';

    store.dispatch({
      type: signUpAsync.fulfilled.type,
      payload: true,
    });

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <RequireSignUp children={<MockChildren />} redirectTo={route} />
        </BrowserRouter>
      </Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});