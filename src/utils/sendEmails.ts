import { resolve } from 'path';
import { readFileSync } from 'fs';
import { createTransport, TransportOptions } from 'nodemailer';

import { shortenName } from './utils';

export const SendEmail = (name: string, email: string): void => {
  const shortName = shortenName(name);
  const transport = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_SECRET,
    },
  } as TransportOptions);

  const dir = resolve(__dirname, '..', 'src', 'resources', 'emails', 'welcome.html');
  const fileBuffer = readFileSync(dir, 'utf-8');
  const jsonBuffer = `${fileBuffer}`.replace('${name}', shortName);

  transport.sendMail({
    from: `Mentorei <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Seja bem-vindo(a) ${shortName}`,
    html: jsonBuffer,
  });
};
