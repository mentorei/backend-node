import { JWT } from 'google-auth-library';
import { Injectable } from '@nestjs/common';
import { calendar_v3, google } from 'googleapis';

import { getTranslatedDays } from 'src/utils/utils';
import { ConnectionInput } from 'src/dto/connection/connection.input';

@Injectable()
export class GoogleMeetService {
  private readonly calendar: calendar_v3.Calendar;
  private readonly authJwt: JWT;

  constructor() {
    this.calendar = google.calendar('v3');
    this.authJwt = new JWT({
      email: process.env.GOOGLE_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'],
    });
  }

  async createMeetingEvent(connection: ConnectionInput) {
    try {
      const event = {
        summary: `Reunião sobre ${connection.skill.name}`,
        description: `Esta é uma reunião para tratar sobre ${connection.skill.name} ${
          connection.mentorAvailability.weekday === 'SUNDAY' || connection.mentorAvailability.weekday === 'SATURDAY'
            ? 'no próximo'
            : 'na próxima'
        } ${getTranslatedDays(connection.mentorAvailability.weekday.toLowerCase())}.`,
        location: 'Virtual / Google Meet',
        start: {
          dateTime: `2023-09-30T${connection.mentorAvailability.openingTime}:00`,
          timeZone: 'America/Sao_Paulo',
        },
        end: {
          dateTime: `2023-09-30T${connection.mentorAvailability.closingTime}:00`,
          timeZone: 'America/Sao_Paulo',
        },
        conferenceData: {
          createRequest: {
            requestId: connection.id,
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 },
          ],
        },
      };

      const response = await this.calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
        conferenceDataVersion: 1,
        auth: this.authJwt,
      });

      return response.data.htmlLink;
    } catch (error) {
      console.error('Erro ao criar a reunião: ', error);
      throw error;
    }
  }
}
