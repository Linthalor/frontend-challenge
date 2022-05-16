import { RootState } from '../../app/store';
import {
  signUpReducer,
  SignUpState,
  singUpAsync,
  resetSignUp,
  setUserFormValues,
  setUserPrefsValues,
  selectSignUpStatus,
  selectUserFormValues,
  selectUserPrefsValues,
} from './sign-up.slice';

describe('color reducer', () => {
  const initialState: SignUpState = {
    signUpStatus: {
      loading: true,
    },
    userFormValues:null,
    userPrefsValues: null,
  };
  const userFormValues = {
    name: 'hello',
    email: 'test@test.com',
    password: 'password1234',
  };
  const userPrefsValues = {
    color: 'blue',
    terms: true
  };

  it('should handle initial state', () => {
    expect(signUpReducer(undefined, { type: 'unknown' })).toEqual({
      signUpStatus: {
        loading: true,
      },
      userFormValues:null,
      userPrefsValues: null,
    });
  });

  it('should set signUpStatus to "pending"', async () => {
    const action = { type: singUpAsync.pending.type };
    const state = signUpReducer(initialState, action);
    expect(state.signUpStatus).toEqual({
      loading: true,
    });
  })

  it('should set signUpStatus to the payload\'s', async () => {
    const action = { type: singUpAsync.fulfilled.type, payload: true };
    const state = signUpReducer(initialState, action);
    expect(state.signUpStatus).toEqual({
      value: true,
    });
  })

  it('should set signUpStatus to the error message', async () => {
    const action = {
      type: singUpAsync.rejected.type,
      error: { message: 'loading error' },
    };
    const state = signUpReducer(initialState, action);
    expect(state.signUpStatus).toEqual({
      errorMessage: 'loading error',
    });
  })


  it('should handle initial state', () => {
    expect(signUpReducer({
      signUpStatus: {
        value: true,
      },
      userFormValues,
      userPrefsValues,
    }, resetSignUp)).toEqual(initialState);
  });

  it('should set userFormValues', () => {
    const state = signUpReducer(initialState, setUserFormValues(userFormValues));
    expect(state.userFormValues).toEqual(userFormValues);
  });

  it('should set userPrefsValues', () => {
    const state = signUpReducer(initialState, setUserPrefsValues(userPrefsValues));
    expect(state.userPrefsValues).toEqual(userPrefsValues);
  });

  it('should return the signUpStatus', async () => {
    const state = signUpReducer({
      signUpStatus: { value: true },
      userFormValues: null,
      userPrefsValues: null,
    }, { type: 'unknown'});
    expect(selectSignUpStatus({
      signUp: state
    } as unknown as RootState)).toEqual({ value: true });
  });

  it('should return the signUpStatus', async () => {
    const state = signUpReducer({
      signUpStatus: { loading: true },
      userFormValues,
      userPrefsValues: null,
    }, { type: 'unknown'});
    expect(selectUserFormValues({
      signUp: state
    } as unknown as RootState)).toEqual(userFormValues);
  });

  it('should return the signUpStatus', async () => {
    const state = signUpReducer({
      signUpStatus: { value: true },
      userFormValues: null,
      userPrefsValues,
    }, { type: 'unknown'});
    expect(selectUserPrefsValues({
      signUp: state
    } as unknown as RootState)).toEqual(userPrefsValues);
  });
});
