import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SignUp, SignUpUserFormValues, SignUpUserPrefsValues } from '../../model/sign-up';
import { AsyncProp, initialAsync } from '../../model/util/async-prop';
import { postSignUp } from './sign-up.api';

export interface AuthState {
  signUpStatus: AsyncProp<true>,
  userFormValues: SignUpUserFormValues | null,
  userPrefsValues: SignUpUserPrefsValues | null,
};

const initialState = (): AuthState => ({
  signUpStatus: initialAsync(),
  userFormValues: null,
  userPrefsValues: null,
});

export const singUpAsync = createAsyncThunk<true, SignUp, { state: RootState }>(
  'auth/postSignUp',
  async (SignUpData) => await postSignUp(SignUpData),
);

export const authSlice = createSlice({
  name: 'auth',
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
    builder
      .addCase(singUpAsync.pending, (state) => {
        state.signUpStatus = {
          loading: true,
        };
      })
      .addCase(singUpAsync.fulfilled, (state, action) => {
        state.signUpStatus = {
          value: action.payload,
        };
      })
      .addCase(singUpAsync.rejected, (state, action) => {
        state.signUpStatus = {
          errorMessage: action.error.message || 'Failed!'
        };
      });
  }
})

export const { resetSignUp, setUserFormValues, setUserPrefsValues } = authSlice.actions;

export const selectSignUpStatus = (state: RootState) => state.auth.signUpStatus;
export const selectUserFormValues = (state: RootState) => state.auth.userFormValues;
export const selectUserPrefsValues = (state: RootState) => state.auth.userPrefsValues;

export const authReducer = authSlice.reducer;