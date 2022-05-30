import { cleanup, render } from '@testing-library/react';
import { TermsAndConditions, TermsAndConditionsRef } from './terms-and-conditions';
import { act } from 'react-dom/test-utils';

jest.mock('@mui/material');

describe('TermsAndConditions', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders as expected closed', () => {
    const { container } = render(
      <TermsAndConditions />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders as expected open', () => {
    let ref: TermsAndConditionsRef | null = null;
    const { container } = render(
      <TermsAndConditions ref={r => ref = r} />
    );

    expect(container.firstChild).toMatchSnapshot();

    act(() => {
      const button = container.querySelector('button');
      ref?.setOpenTerms(true);
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});