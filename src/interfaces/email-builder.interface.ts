import { Transporter } from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';

import { IHtmlOptions } from './html-options.interface';

export interface IEmailBuilder {
  transport: Transporter;
  mailOptions: Options;
  setTo(to: string): this;
  setSubject(subject: string): this;
  setHtml(data: IHtmlOptions): this;
  sendMail(): void;
}
