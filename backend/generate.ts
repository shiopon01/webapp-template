import {
  generateRoutes,
  generateSwaggerSpec,
  RoutesConfig,
  SwaggerConfig,
} from 'tsoa';

(async () => {
  // 自動生成する Swagger.json の設定
  const swaggerOptions: SwaggerConfig = {
    basePath: '/',
    entryFile: './src/app.ts',
    specVersion: 3,
    outputDirectory: './docs',
    controllerPathGlobs: ['./src/controllers/*.controller.ts'],
    host: 'localhost:3001',
    schemes: ['http'],
    noImplicitAdditionalProperties: 'silently-remove-extras',
  };
  // 自動生成する routes.ts の設定
  const routeOptions: RoutesConfig = {
    basePath: '/',
    entryFile: './src/app.ts',
    routesDir: './src',
    middleware: 'express',
    authenticationModule: './src/auth.ts',
    iocModule: './src/ioc',
  };
  // 自動生成の実行
  await generateSwaggerSpec(swaggerOptions, routeOptions);
  await generateRoutes(routeOptions, swaggerOptions);
})();
