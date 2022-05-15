import * as EmailValidator from 'email-validator';
import { Validator } from './validator';

export const email: Validator<string> = <K extends string>(
  name: K,
  value: string
) => {
  return !EmailValidator.validate(value)
    ? { [name]: `The email is incorrectly formated.` } as { [P in K]: string }
    : undefined;
};
