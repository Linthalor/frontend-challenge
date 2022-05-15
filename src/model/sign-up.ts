import { Color } from './color';

export interface SignUpUserFormValues {
  name: string;
  email: string;
  password: string;
};

export interface SignUpUserPrefsValues {
  color: Color;
  terms: boolean;
};

export type SignUp = SignUpUserFormValues & SignUpUserPrefsValues;