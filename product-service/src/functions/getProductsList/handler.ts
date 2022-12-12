import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getProductsMockData } from '@libs/products-mock-data';
// import ApiError from '../../utils/api-error';
// import { NOT_FOUND } from 'http-status';

const getProductsList = async (event) => {
  const resultData = getProducts();

  // if (!resultData) {
  //   throw new ApiError('Product not found', NOT_FOUND);
  // } 

  return formatJSONResponse({
    data: resultData,
    event,
  });
};

export const getProducts = () => {
  return getProductsMockData();
};

export const main = middyfy(getProductsList);
