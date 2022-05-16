import { required } from './required.validator';

describe('email validator', () => {
  const requiredKey = 'some required';
  it('should return an error if the value has not been set', () => {
    expect(required(requiredKey,'')).toEqual({
      [requiredKey]: `${requiredKey} is required.`
    });
  });

  it('should return undefined if the has been set', async () => {
    expect(required(requiredKey, 'something')).toEqual(undefined);
  });
});
