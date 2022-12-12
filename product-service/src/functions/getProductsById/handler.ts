import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getProductsByIdMockData } from '@libs/products-mock-data';
import ApiError from '../../utils/api-error';
import { NOT_FOUND } from 'http-status';

const getProductsById = async (event) => {
  const resultData = getProduct(event.pathParameters.id);

  if (!resultData) {
    throw new ApiError('Product not found', NOT_FOUND);
  }

  return formatJSONResponse({
    data: resultData,
    event,
  });
};

export const getProduct = (id) => {
  const res = getProductsByIdMockData(id);

  return res.length ? res[0] : null;
};

export const main = middyfy(getProductsById);
