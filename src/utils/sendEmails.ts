import { readFileSync } from 'node:fs';

export function SendEmail (name: string , email: string): void {
    const nodemailer = require('nodemailer');
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_SECRET,
        } 
    })
    
    const dir = __dirname + '/../src/resources/email/wellcome.html'
    const fileBuffer = readFileSync(dir, 'utf-8');
    const jsonBuffer = `${fileBuffer}`.replace('${name}', name)
    
    transport.sendMail({
        from:`Mentorei <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Seja bem-vindo(a) ' + name,
        html: jsonBuffer,
    })
};
  