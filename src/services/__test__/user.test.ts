import { expect, describe } from '@jest/globals';
import {
  getUser,
  initialState,
  loginUser,
  logout,
  registerUser,
  updateUser,
  userSliceReducer
} from '../slices/userSlice';

describe('тесты редьюсера User', () => {
  test('инициализация', () => {
    const state = userSliceReducer(undefined, { type: '' });

    expect(state).toEqual(initialState);
  });

  test('тест registerUser pending', () => {
    const action = {
      type: registerUser.pending.type
    };
    const state = userSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('тест registerUser rejected', () => {
    const errorMessage = 'Registration failed';
    const action = {
      type: registerUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = userSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: errorMessage
    });
  });

  test('тест registerUser fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type
    };
    const state = userSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      isAuthenticated: true
    });
  });

  test('тест getUser pending', () => {
    const action = {
      type: getUser.pending.type
    };
    const state = userSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('тест getUser rejected', () => {
    const action = {
      type: getUser.rejected.type
    };
    const state = userSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      isAuthenticated: false
    });
  });

  test('тест getUser fulfilled', () => {
    const payload = {
      user: {
        name: 'test',
        email: 'test@test.ru'
      }
    };
    const action = {
      type: getUser.fulfilled.type,
      payload
    };
    const state = userSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      user: { name: 'test', email: 'test@test.ru' },
      isAuthenticated: true
    });
  });

  test('тест loginUser pending', () => {
    const action = {
      type: loginUser.pending.type
    };
    const state = userSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('тест loginUser rejected', () => {
    const errorMessage = 'Login failed';
    const action = {
      type: loginUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = userSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: errorMessage
    });
  });

  test('тест loginUser fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type
    };
    const state = userSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      isAuthenticated: true
    });
  });

  test('тест updateUser pending', () => {
    const action = {
      type: updateUser.pending.type
    };
    const state = userSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('тест updateUser rejected', () => {
    const action = {
      type: updateUser.rejected.type
    };
    const state = userSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false
    });
  });

  test('тест updateUser fulfilled', () => {
    const payload = {
      success: true,
      user: {
        name: 'Updated Name',
        email: 'updated@test.ru'
      }
    };
    const action = {
      type: updateUser.fulfilled.type,
      payload
    };
    const state = userSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      user: {
        name: 'Updated Name',
        email: 'updated@test.ru'
      }
    });
  });

  test('тест logout pending', () => {
    const action = {
      type: logout.pending.type
    };
    const state = userSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('тест logout rejected', () => {
    const action = {
      type: logout.rejected.type
    };
    const state = userSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false
    });
  });

  test('тест logout fulfilled', () => {
    const payload = {
      success: true
    };
    const action = {
      type: logout.fulfilled.type,
      payload
    };
    const state = userSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      user: { name: '', email: '' },
      isAuthenticated: false
    });
  });
});
