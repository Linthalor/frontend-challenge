import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './app/theme';;
import { resetSignUp, signUpAsync } from './features/sign-up/sign-up.slice';
import { act } from 'react-dom/test-utils';

jest.mock('@mui/material');

describe('App', () => {
  afterEach(() => {
      cleanup();
  });

  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  it('renders gaurds the success route', () => {
    store.dispatch({
      type: signUpAsync.fulfilled.type,
      payload: true,
    });
    window.history.pushState({}, '', '/success');
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    );
    expect(container.firstChild).toMatchSnapshot();

    act(() => {
      store.dispatch(resetSignUp());
      window.history.pushState({}, '', '/success');
    });
    
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders gaurds the error route', () => {
    store.dispatch({
      type: signUpAsync.rejected.type,
      error: { message: 'some error' },
    });
    window.history.pushState({}, '', '/error');
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    );
    expect(container.firstChild).toMatchSnapshot();

    act(() => {
      store.dispatch(resetSignUp());
      window.history.pushState({}, '', '/error');
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
