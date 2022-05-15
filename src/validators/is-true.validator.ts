import { Validator } from './validator';

export const isTrue: Validator<boolean> = <K extends string>(
  name: K,
  value: boolean,
  errorMessage: string
) => {
  return !value
    ? { [name]: errorMessage } as { [P in K]: string }
    : undefined;
};