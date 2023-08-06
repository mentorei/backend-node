import { NestFactory } from '@nestjs/core';
import fastifyHelmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as fs from 'fs';
import * as cors from 'cors';

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('src/ssl/code.key'),
    cert: fs.readFileSync('src/ssl/code.crt'),
  };

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ https: httpsOptions }));

  app.use(cors());

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

  await app.listen(3000, '0.0.0.0');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
