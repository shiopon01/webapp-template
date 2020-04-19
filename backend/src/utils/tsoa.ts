import {
  generateRoutes,
  generateSwaggerSpec,
  RoutesConfig,
  SwaggerConfig,
} from 'tsoa';

/**
 * tsoaを使ってswagger.jsonとroutes.tsを生成
 *
 * @returns {Promise<void>}
 */
const execTSOA = async (): Promise<void> => {
  // 自動生成する Swagger.json の設定
  const swaggerOptions: SwaggerConfig = require('../../tsoa.json').swagger;
  // 自動生成する routes.ts の設定
  const routeOptions: RoutesConfig = require('../../tsoa.json').routes;
  // 自動生成の実行
  await generateSwaggerSpec(swaggerOptions, routeOptions);
  await generateRoutes(routeOptions, swaggerOptions);
  console.log('finish gen');
};

export default execTSOA;
