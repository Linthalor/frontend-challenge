import { RootState } from '../../app/store';
import {
  colorReducer,
  ColorState,
  getColorsAsync,
  selectColors,
} from './color.slice';

describe('color reducer', () => {
  const initialState: ColorState = {
    loading: true,
  };
  const colors = ['black', 'blue', 'green', 'red', 'white'];

  it('should handle initial state', () => {
    expect(colorReducer(undefined, { type: 'unknown' })).toEqual({
      loading: true,
    });
  });

  it('should set the value to "pending"', async () => {
    const action = { type: getColorsAsync.pending.type };
    const state = colorReducer(initialState, action);
    expect(state).toEqual({
      loading: true,
    });
  });

  it('should set the value to the payload\'s', async () => {
    const action = { type: getColorsAsync.fulfilled.type, payload: colors };
    const state = colorReducer(initialState, action);
    expect(state).toEqual({
      value: colors,
    });
  });

  it('should set the value to the error message', async () => {
    const action = {
      type: getColorsAsync.rejected.type,
      error: { message: 'loading error' },
    };
    const state = colorReducer(initialState, action);
    expect(state).toEqual({
      errorMessage: 'loading error',
    });
  });

  it('should return the colors', async () => {
    const state = colorReducer({ value: colors }, { type: 'unknown'});
    expect(selectColors({ color: state } as unknown as RootState)).toEqual({ value: colors });
  });
});
