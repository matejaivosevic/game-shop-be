import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';
import createProduct from '@functions/createProduct';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-auto-swagger'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PRODUCT_TABLE: 'Product',
      STOCK_TABLE: 'Stock'
    },
  },
  functions: { getProductsList, getProductsById, createProduct },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      apiType: 'http',
      generateSwaggerOnDeploy: true,
      schemes: ["https", "ws", "wss"],
      excludeStages: ['production', 'anyOtherStage'],
      host: 'xck7eiwcuj.execute-api.us-east-1.amazonaws.com/dev'
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "s3:ListBucket",
        Resource: [
          "arn:aws:s3:::game-product-img"
        ]
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: [
          'arn:aws:s3:::game-product-img/*'
        ]
      },
      {
        Effect: "Allow",
        Action: [
            "dynamodb:DescribeTable",
            "dynamodb:Query",
            "dynamodb:Scan"
        ],
        Resource: "arn:aws:dynamodb:us-east-1:428087619407:table/Product"
      }
    ]
  },
};

module.exports = serverlessConfiguration;
