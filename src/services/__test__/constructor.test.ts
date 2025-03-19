import { expect, describe } from '@jest/globals';
import {
  addIngredient,
  closeOrderModal,
  constructorSliceReducer,
  deleteIngredient,
  getIngredients,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  newOrder
} from '../slices/constructorSlice';
import {
  mockBun,
  mockConstructorState,
  mockIngredient,
  mockIngredients,
  mockOrder
} from './testData';

describe('тесты редьюсера Constructor', () => {
  test('инициализация', () => {
    const state = constructorSliceReducer(undefined, { type: '' });

    expect(state).toEqual(initialState);
  });

  test('Тест addIngredient - ingredient', () => {
    const newState = constructorSliceReducer(
      mockConstructorState,
      addIngredient(mockIngredient)
    );

    const ingredients = newState.constructorItems.ingredients;
    expect(ingredients.length).toEqual(3);
    expect(ingredients[2].name).toEqual(mockIngredient.name);
  });

  test('Тест addIngredient - bun', () => {
    const newState = constructorSliceReducer(
      mockConstructorState,
      addIngredient(mockBun)
    );

    const bun = newState.constructorItems.bun;
    expect(bun.name).toEqual(mockBun.name);
  });

  test('Тест deleteIngredient', () => {
    const newState = constructorSliceReducer(
      mockConstructorState,
      deleteIngredient(mockConstructorState.constructorItems.ingredients[0])
    );

    const ingredients = newState.constructorItems.ingredients;
    expect(ingredients.length).toEqual(1);
  });

  test('Тест moveIngredientUp', () => {
    const newState = constructorSliceReducer(
      mockConstructorState,
      moveIngredientUp(mockConstructorState.constructorItems.ingredients[1])
    );

    expect(newState.constructorItems.ingredients[0].id).toEqual(
      mockConstructorState.constructorItems.ingredients[1].id
    );
  });

  test('Тест moveIngredientDown', () => {
    const newState = constructorSliceReducer(
      mockConstructorState,
      moveIngredientDown(mockConstructorState.constructorItems.ingredients[0])
    );

    expect(newState.constructorItems.ingredients[1].id).toEqual(
      mockConstructorState.constructorItems.ingredients[0].id
    );
  });

  test('Тест closeOrderModal', () => {
    mockConstructorState.orderModalData = mockOrder;

    const newState = constructorSliceReducer(
      mockConstructorState,
      closeOrderModal()
    );

    expect(newState.orderModalData).toEqual(null);
  });

  test('Тест getIngredients fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = constructorSliceReducer(initialState, action);
    expect(state).toEqual({ ...initialState, ingredients: mockIngredients });
  });

  test('Тест getIngredients pending', () => {
    const action = {
      type: getIngredients.pending.type
    };
    const state = constructorSliceReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  test('Тест getIngredients rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Test Error' }
    };
    const state = constructorSliceReducer(initialState, action);
    expect(state).toEqual({ ...initialState, error: 'Test Error' });
  });

  test('Тест newOrder fulfilled', () => {
    const orderData = {
      order: {
        name: 'test',
        number: 123,
        price: 500
      }
    };
    const action = {
      type: newOrder.fulfilled.type,
      payload: orderData
    };
    const state = constructorSliceReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderModalData: orderData.order,
      orderRequest: false,
      constructorItems: initialState.constructorItems
    });
  });

  test('Тест newOrder pending', () => {
    const action = {
      type: newOrder.pending.type
    };
    const state = constructorSliceReducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderRequest: true });
  });

  test('Тест newOrder rejected', () => {
    const action = {
      type: newOrder.rejected.type,
      error: { message: 'Test Error' }
    };
    const state = constructorSliceReducer(initialState, action);
    expect(state).toEqual({ ...initialState, error: 'Test Error' });
  });
});
