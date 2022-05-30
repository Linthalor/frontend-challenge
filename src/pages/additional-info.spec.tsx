import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createTestStore, store as realStore } from '../app/store';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from '../app/theme';
import { AdditionalInfo } from './additional-info';

jest.mock('@mui/material');

describe('AdditionalInfo', () => {
  let store: typeof realStore;
  beforeEach(() => {
    store = createTestStore();
  });
  afterEach(() => {
    cleanup();
  });

  it('renders as expected', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <AdditionalInfo />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});