import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getProductsByIdMockData } from '@libs/products-mock-data';

const getProductsById = async (event) => {
  return formatJSONResponse({
    data: getProductsByIdMockData(event.pathParameters.id),
    event,
  });
};

export const main = middyfy(getProductsById);
