import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EventMeetInfo } from 'src/entities/meet/event-meet-info.entity';
import { google } from 'googleapis';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MeetService {
  constructor(private readonly $prisma: PrismaClient) {}

  calendar = google.calendar({
    version: 'v3',
    auth: process.env.API_KEY,
  });

  scopes = ['https://www.googleapis.com/auth/calendar'];

  // todo: Criar tabela relacionada com usuário para guardar informações do token de acesso ao calendario:
  // code (codeigo usado para gerar token do usuário)
  public async createMeetMentor(eventMeetInfo: EventMeetInfo): Promise<any> {
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URL
    );

    const mentee = this.$prisma.mentee.findUnique({ where: { id: eventMeetInfo.menteeId } });
    const mentor = this.$prisma.mentor.findUnique({ where: { id: eventMeetInfo.mentorId } });

    //TODO: Pegar code do banco
    const code = '';

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const event = {
      calendarId: 'primary',
      auth: oauth2Client,
      conferenceDataVersion: 1,
      requestBody: {
        summary: `Mentoria ${mentee.user.name} : ${mentor.user.name}`,
        description: 'Evento muito importante do Mentorei',
        start: {
          dateTime: eventMeetInfo.startMeetDateTime,
          timeZone: 'America/Sao_Paulo',
        },
        end: {
          dateTime: eventMeetInfo.endMeetDateTime,
          timeZone: 'America/Sao_Paulo',
        },
        conferenceData: {
          createRequest: {
            requestId: uuid(),
          },
        },
        attendees: [
          {
            email: mentee.user.email,
          },
        ],
      },
    };

    await this.calendar.events.insert(event);

    return { msg: 'Sucesso' };
  }
}
