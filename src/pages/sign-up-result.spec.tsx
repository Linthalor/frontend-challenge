import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createTestStore, store as realStore } from '../app/store';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from '../app/theme';
import { SignupResult } from './sign-up-result';

jest.mock('@mui/material');

describe('SignupResult', () => {
  let store: typeof realStore;
  beforeEach(() => {
    store = createTestStore();
  });
  afterEach(() => {
    cleanup();
  });
  
  it('renders as expected on success', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <SignupResult success />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders as expected on failure', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <SignupResult />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});