import { NestFactory } from '@nestjs/core';
import fastifyHelmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://example.com',
      'http://www.example.com',
      'http://app.example.com',
      'https://example.com',
      'https://www.example.com',
      'https://app.example.com',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`, 'unpkg.com'],
        styleSrc: [`'self'`, `'unsafe-inline'`, 'cdn.jsdelivr.net', 'fonts.googleapis.com', 'unpkg.com'],
        fontSrc: [`'self'`, 'fonts.gstatic.com', 'data:'],
        imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`, `'unsafe-eval'`],
      },
    },
  });
  await app.register(fastifyCsrf);
  await app.listen(3000, '0.0.0.0');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
