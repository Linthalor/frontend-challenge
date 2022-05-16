import { email } from './email.validator';

describe('email validator', () => {
  const emailKey = 'some email';
  it('should return an error if the email is not formated correctly', () => {
    expect(email(emailKey, 'not.an.email')).toEqual({
      [emailKey]: 'The email is incorrectly formated.'
    });
  });

  it('should return undefined if the email is formatted correctly', async () => {
    expect(email(emailKey, 'test@test.com')).toEqual(undefined);
  });
});
