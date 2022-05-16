import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Color } from '../../model/color';
import { AsyncProp, initialAsync } from '../../model/util/async-prop';
import { addAsyncResultAsState } from '../slice-helper';
import { getColors } from './color.api';

export type ColorState = AsyncProp<Color[]>;

const initialState: ColorState = initialAsync() as ColorState;

export const getColorsAsync = createAsyncThunk<Color[], void, { state: RootState }>(
  'colors/get',
  async () => await getColors(),
);

export const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncResultAsState(getColorsAsync, builder);
  },
});

export const selectColors = (state: RootState) => state.color;

export const colorReducer = colorSlice.reducer;