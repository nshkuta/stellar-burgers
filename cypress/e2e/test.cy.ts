const API_URL = 'https://norma.nomoreparties.space/api/';

beforeEach(() => {
  window.localStorage.setItem('refreshToken', 'testRefreshToken');
  cy.setCookie('accessToken', 'testAccessToken');

  cy.fixture('ingredients.json').then((ingredients) => {
    cy.intercept(
      {
        method: 'GET',
        url: `${API_URL}/ingredients`
      },
      ingredients
    ).as('getIngredients');
  });

  cy.fixture('user.json').then((user) => {
    cy.intercept(
      {
        method: 'GET',
        url: `${API_URL}/auth/user`
      },
      user
    ).as('getUser');
  });

  cy.fixture('newOrder.json').then((newOrder) => {
    cy.intercept(
      {
        method: 'POST',
        url: `${API_URL}/orders`
      },
      newOrder
    ).as('newOrder');
  });

  cy.visit('http://localhost:4000');
  cy.wait('@getIngredients');
  cy.wait('@getUser');
});

afterEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
});

describe('тесты', function () {
  const bunId = '643d69a5c3f7b9001cfa093c';
  const bunText = 'Test Краторная булка N-200i';
  const ingredientId = '643d69a5c3f7b9001cfa093e';
  const ingredientText = 'Test Филе Люминесцентного тетраодонтимформа';

  const noBunsTopSelector = `[data-cy=no_buns_top]`;
  const noBunsBottomSelector = `[data-cy=no_buns_bottom]`;
  const noIngredientsSelector = `[data-cy=no_ingredients]`;
  const bunSelector = `[data-cy=bun_${bunId}]`;
  const ingredientSelector = `[data-cy=ingredient_${ingredientId}]`;
  const burgerConstructorSelector = `[data-cy=burger_constructor]`;

  it('приложение доступно на http://localhost:4000', function () {});

  it('добавление ингредиента из списка в конструктор', function () {
    cy.get(noBunsTopSelector).contains('Выберите булки');
    cy.get(noBunsBottomSelector).contains('Выберите булки');
    cy.get(noIngredientsSelector).contains('Выберите начинку');

    cy.get(bunSelector + ' button').click();
    cy.get(ingredientSelector + ' button').click();

    cy.get(burgerConstructorSelector).contains(bunText);
    cy.get(burgerConstructorSelector).contains(ingredientText);
  });

  it('работа модальных окон', () => {
    cy.get(bunSelector).click();

    cy.get(`[data-cy=modal]`);
    cy.get(`[data-cy=modal_close_button]`).click();
    cy.get(`[data-cy=modal]`).should('not.exist');

    cy.get(bunSelector).click();
    cy.get(`[data-cy=modal_overlay]`).click({ force: true });
    cy.get(`[data-cy=modal]`).should('not.exist');
  });

  it('создание заказа', () => {
    cy.get(bunSelector + ` button`).click();
    cy.get(ingredientSelector + ` button`).click();

    cy.get(`[data-cy=new_order] button`).click();
    cy.fixture('newOrder.json').then((newOrder) => {
      cy.get(`[data-cy=new_order_number]`).contains(newOrder.order.number);
    });

    cy.get(`[data-cy=modal_close_button]`).click();
    cy.get(`[data-cy=modal]`).should('not.exist');

    cy.get(noBunsTopSelector).contains('Выберите булки');
    cy.get(noBunsBottomSelector).contains('Выберите булки');
    cy.get(noIngredientsSelector).contains('Выберите начинку');
  });
});
