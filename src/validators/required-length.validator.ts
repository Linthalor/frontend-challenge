import { Validator } from './validator';

export const requiredLength: Validator<string> = <K extends string>(
  name: K,
  value: string,
  minLength: number
) => {
  return value.length < minLength
    ? { [name]: `${name} must be at least ${minLength} characters long.` } as { [P in K]: string }
    : undefined;
};