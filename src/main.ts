import { NestFactory } from '@nestjs/core';
import fastifyHelmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { readFile } from 'fs/promises';
import { resolve } from 'path';

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const sslPaths = {
    privateKey: resolve(__dirname, '..', 'ssl', 'certs', 'mentorei.app', 'privkey.pem'),
    certificate: resolve(__dirname, '..', 'ssl', 'certs', 'mentorei.app', 'cert.pem'),
    ca: resolve(__dirname, '..', 'ssl', 'certs', 'mentorei.app', 'chain.pem'),
  };

  const [privateKey, cert, ca] = await Promise.all([
    readFile(sslPaths.privateKey, 'utf8'),
    readFile(sslPaths.certificate, 'utf8'),
    readFile(sslPaths.ca, 'utf8'),
  ]);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ https: { key: privateKey, cert, ca } })
  );

  app.enableCors();

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

  const PORT = process.env.SERVER_PORT || 0;

  await app.register(fastifyCsrf);
  await app.listen(PORT, '0.0.0.0');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
