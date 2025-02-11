import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { signUpReducer } from '../features/sign-up/sign-up.slice';
import { colorReducer } from '../features/color/color.slice';

export const createTestStore = () => {
  const store = configureStore({
    reducer: {
      signUp: signUpReducer,
      color: colorReducer,
    },
  });
  return store;
}
export const store = createTestStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
