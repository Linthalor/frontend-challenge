import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SignUp, SignUpUserFormValues, SignUpUserPrefsValues } from '../../model/sign-up';
import { AsyncProp, initialAsync } from '../../model/util/async-prop';
import { addAsyncResultToState } from '../slice-helper';
import { postSignUp } from './sign-up.api';

export interface SignUpState {
  signUpStatus: AsyncProp<true>,
  userFormValues: SignUpUserFormValues | null,
  userPrefsValues: SignUpUserPrefsValues | null,
};

const initialState = (): SignUpState => ({
  signUpStatus: initialAsync(),
  userFormValues: null,
  userPrefsValues: null,
});

export const singUpAsync = createAsyncThunk<true, SignUp, { state: RootState }>(
  'sign-up/postSignUp',
  async (SignUpData) => await postSignUp(SignUpData),
);

export const signUpSlice = createSlice({
  name: 'sign-up',
  initialState: initialState(),
  reducers: {
    resetSignUp: () => initialState(),
    setUserFormValues: (state, action: PayloadAction<SignUpUserFormValues>) => {
      state.userFormValues = action.payload;
    },
    setUserPrefsValues: (state, action: PayloadAction<SignUpUserPrefsValues>) => {
      state.userPrefsValues = action.payload;
    },
  },
  extraReducers: (builder) => {
    addAsyncResultToState('signUpStatus', singUpAsync, builder);
  }
})

export const { resetSignUp, setUserFormValues, setUserPrefsValues } = signUpSlice.actions;

export const selectSignUpStatus = (state: RootState) => state.signUp.signUpStatus;
export const selectUserFormValues = (state: RootState) => state.signUp.userFormValues;
export const selectUserPrefsValues = (state: RootState) => state.signUp.userPrefsValues;

export const signUpReducer = signUpSlice.reducer;