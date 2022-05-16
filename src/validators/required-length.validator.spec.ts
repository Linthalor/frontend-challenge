import { requiredLength } from './required-length.validator';

describe('required length validator', () => {
  const requiredLengthKey = 'some required length';
  const testStr = 'password';
  it('should return an error if the value is not long enough', () => {
    expect(requiredLength(requiredLengthKey, testStr, 10)).toEqual({
      [requiredLengthKey]: `${requiredLengthKey} must be at least 10 characters long.`
    });
  });

  it('should return undefined if the string is long enough', async () => {
    expect(requiredLength(requiredLengthKey, testStr+'some more', 10)).toEqual(undefined);
    expect(requiredLength(requiredLengthKey, testStr, 8)).toEqual(undefined);
  });
});
