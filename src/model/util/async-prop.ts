export interface Value<T> {
  value: T;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Pending<T = never> {
  loading: true;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Error<T = never> {
  errorMessage: string;
}
// Generic needs to be passed to all so that it can be inferred when unwrapping.
// If there is a better solution for this, I'd like to know.
export type AsyncProp<T> = Value<T> | Pending<T> | Error<T>;

export const initialAsync = <T>(): Pending<T> => ({
  loading: true,
});

export const isLoading = <T>(
  prop: AsyncProp<T>
): prop is Pending<T> => (prop as Pending<T>).loading !== undefined;
export const isError = <T>(
  prop: AsyncProp<T>
): prop is Error<T> => (prop as Error<T>).errorMessage !== undefined;
export const isValue = <T>(
  prop: AsyncProp<T>
): prop is Value<T> => (prop as Value<T>).value !== undefined;