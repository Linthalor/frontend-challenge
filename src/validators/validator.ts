// TODO: support currying on the name so that a combine validator could make it cleaner to use
export type Validator<T> = <K extends string>(
  name: K,
  value: T,
  ...validatorConfig: any
) => {
  [P in K]: string
} | undefined;