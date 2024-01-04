import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { BadRequestErrorFilter } from './filters/bad-request-error/bad-request-error.filter';
import { UnauthorizedErrorFilter } from './filters/unauthorized-error/unauthorized-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalFilters(
    new BadRequestErrorFilter(),
    new UnauthorizedErrorFilter(),
  )

  await app.listen(process.env.PORT);
}
bootstrap();
