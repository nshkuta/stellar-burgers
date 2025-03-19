import { expect, describe } from '@jest/globals';
import {
  getFeeds,
  getOrders,
  initialState,
  ordersSliceReducer
} from '../slices/ordersSlice';

describe('тесты редьюсера Orders', () => {
  test('инициализация', () => {
    const state = ordersSliceReducer(undefined, { type: '' });

    expect(state).toEqual(initialState);
  });

  test('тест getFeeds pending', () => {
    const action = {
      type: getFeeds.pending.type
    };
    const state = ordersSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('тест getFeeds rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Test Error' }
    };
    const state = ordersSliceReducer(initialState, action);
    expect(state).toEqual({ ...initialState, error: 'Test Error' });
  });

  test('тест getFeeds fulfilled', () => {
    const payload = {
      orders: [{ id: 1, name: 'test' }],
      total: 10,
      totalToday: 5
    };
    const action = {
      type: getFeeds.fulfilled.type,
      payload
    };
    const state = ordersSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      orders: payload.orders,
      totalOrders: payload.total,
      ordersToday: payload.totalToday
    });
  });

  test('тест getOrders pending', () => {
    const action = {
      type: getOrders.pending.type
    };
    const state = ordersSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('тест getOrders rejected', () => {
    const action = {
      type: getOrders.rejected.type,
      error: { message: 'Test Error' }
    };
    const state = ordersSliceReducer(initialState, action);
    expect(state).toEqual({ ...initialState, error: 'Test Error' });
  });

  test('тест getOrders fulfilled', () => {
    const payload = [{ id: 1, name: 'test' }];
    const action = {
      type: getOrders.fulfilled.type,
      payload
    };
    const state = ordersSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      userOrders: payload
    });
  });
});
