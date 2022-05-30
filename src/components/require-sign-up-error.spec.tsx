import { cleanup, render } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createTestStore, store as realStore } from '../app/store';
import { signUpAsync } from '../features/sign-up/sign-up.slice';
import { RequireSignUp } from './require-sign-up';
import { RequireSignUpError } from './require-sign-up-error';
import { SignUpCard } from './signup-card';

jest.mock('@mui/material');
jest.mock('react-router-dom');

describe('RequireSignUpError', () => {
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
          <RequireSignUpError children={<MockChildren />} redirectTo={route} />
        </BrowserRouter>
      </Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display the children with failed signup status', () => {
    const route = 'mock-route';
    const MockChildren = 'mock-children';

    store.dispatch({
      type: signUpAsync.rejected.type,
      error: { message: 'some error' },
    });

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <RequireSignUpError children={<MockChildren />} redirectTo={route} />
        </BrowserRouter>
      </Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});