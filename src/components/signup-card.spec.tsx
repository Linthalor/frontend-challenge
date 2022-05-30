import { cleanup, render } from '@testing-library/react';
import { SignUpCard } from './signup-card';

jest.mock('@mui/material');

describe('SignUpCard', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders as expected', () => {
    const MockContent = 'mocked-content';
    const MockActions = 'mocked-actions';

    const { container } = render(
      <SignUpCard content={<MockContent />} actions={<MockActions />} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});