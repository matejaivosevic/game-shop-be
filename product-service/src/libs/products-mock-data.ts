const data = require('../mocks/products.json');

export const getProductsMockData = () => {
  return data.products;
}

export const getProductsByIdMockData = (id) => {
  return data.products.filter(x => x.id === id);
};
