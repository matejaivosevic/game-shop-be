import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getProductsMockData } from '@libs/products-mock-data';

const getProductsList = async (event) => {
  return formatJSONResponse({
    data: getProductsMockData(),
    event,
  });
};

export const main = middyfy(getProductsList);
