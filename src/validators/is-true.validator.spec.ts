import { isTrue } from './is-true.validator';

describe('is true validator', () => {
  const isTrueKey = 'some is true';
  const errorMessage = 'some error message';
  it('should return an error if the value is not true', () => {
    expect(isTrue(isTrueKey, false, errorMessage)).toEqual({
      [isTrueKey]: errorMessage
    });
  });

  it('should return undefined if the value is true', async () => {
    expect(isTrue(isTrueKey, true)).toEqual(undefined);
  });
});
