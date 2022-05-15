import { Validator } from './validator';

export const required: Validator<string> = <K extends string>(
  name: K,
  value: string
) => {
  return !value.length
    ? { [name]: `${name} is required.` } as { [P in K]: string }
    : undefined;
}