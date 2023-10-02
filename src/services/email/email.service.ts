import { resolve } from 'path';
import { readFileSync } from 'fs';
import { Injectable } from '@nestjs/common';
import { Options } from 'nodemailer/lib/mailer';
import { createTransport, Transporter, TransportOptions } from 'nodemailer';

import { IEmailBuilder } from 'src/interfaces/email-builder.interface';
import { IHtmlOptions } from 'src/interfaces/html-options.interface';

@Injectable()
export class EmailService implements IEmailBuilder {
  public readonly transport: Transporter;
  public readonly mailOptions: Options;

  constructor() {
    this.transport = createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_SECRET,
      },
    } as TransportOptions);

    this.mailOptions = { from: `Mentorei <${process.env.EMAIL_USER}>` };
  }

  public setTo(to: string): this {
    this.mailOptions.to = to;
    return this;
  }

  public setSubject(subject: string): this {
    this.mailOptions.subject = subject;
    return this;
  }

  public setHtml(data: IHtmlOptions): this {
    const dir = resolve(__dirname, '..', 'src', 'resources', 'emails', data.template);
    const fileBuffer = readFileSync(dir, 'utf-8');

    if (data.type === 'WELCOME') {
      this.mailOptions.html = `${fileBuffer}`.replace('${name}', data.metadata.name);
    } else {
      this.mailOptions.html = `${fileBuffer}`
        .replace('${name}', data.metadata.name)
        .replace('${code}', data.metadata.code);
    }
    return this;
  }

  public sendMail(): void {
    this.transport.sendMail(this.mailOptions);
  }
}
