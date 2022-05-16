import { ActionReducerMapBuilder, AsyncThunk, Draft } from '@reduxjs/toolkit';
import { AsyncProp } from '../model/util/async-prop';

type ResolvedAsyncProp<T extends AsyncProp<any>> = T extends AsyncProp<infer R> ? R : never;

export const addAsyncResultToState = <
  T extends ResolvedAsyncProp<Q[M]>,
  K,
  L,
  M extends Extract<keyof Q, string>,
  Q extends { [P in M]: Q[M] },
>(
  statePropName: M,
  thunkAction: AsyncThunk<T, K, L>,
  builder: ActionReducerMapBuilder<Q>,
  fulfilledCallback?: (
    state: Draft<Q>,
    actionPayload: T,
  ) => void,
) => builder
  .addCase(thunkAction.pending, (state) => {
    ((state as Q)[statePropName] as AsyncProp<T>) = {
      loading: true,
    };
  })
  .addCase(thunkAction.fulfilled, (state, action) => {
    ((state as Q)[statePropName] as AsyncProp<T>) = {
      value: action.payload
    };
    fulfilledCallback && fulfilledCallback(state, action.payload);
  })
  /*
    TODO: FIXME: need to solve the generics of action. it isn't deducing that it is an
    error correctly
  */
  .addCase(thunkAction.rejected, (state, action: any) => {
    console.error('error', action);
    ((state as Q)[statePropName] as AsyncProp<T>) = {
      errorMessage: action.error.message || 'failed',
    };
  });

export const addAsyncResultAsState = <T, K, L, Q extends AsyncProp<T>>(
  thunkAction: AsyncThunk<T, K, L>,
  builder: ActionReducerMapBuilder<Q>,
  fulfilledCallback?: (
    state: Draft<Q>,
    actionPayload: T,
  ) => void,
) => builder
  .addCase(thunkAction.pending, (state) => ({
    loading: true,
  }) as Draft<Q>)
  .addCase(thunkAction.fulfilled, (state, action) => {
    fulfilledCallback && fulfilledCallback(state, action.payload);
    return {
      value: action.payload,
    } as Draft<Q>;
  })
  /*
    TODO: FIXME: need to solve the generics of action. it isn't deducing that it is an
    error correctly
  */
  .addCase(thunkAction.rejected, (state, action: any) => {
    console.error('error', action);
    return {
      errorMessage: action.error.message || 'failed',
    } as Draft<Q>;
  });