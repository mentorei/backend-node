import { JWT } from 'google-auth-library';
import { Injectable } from '@nestjs/common';
import { calendar_v3, google } from 'googleapis';

import credentials from '../../resources/credentials.json';
import { ConnectionInput } from 'src/dto/connection/connection.input';

@Injectable()
export class GoogleMeetService {
  private readonly calendar: calendar_v3.Calendar;
  private readonly authJwt: JWT;

  constructor() {
    this.calendar = google.calendar('v3');
    this.authJwt = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'],
    });
  }

  async createMeetingEvent(connection: ConnectionInput) {
    try {
      const event = {
        summary: 'Reunião do Nest.js',
        description: 'Esta é uma reunião de teste do Nest.js',
        start: {
          dateTime: '2023-09-30T10:00:00',
          timeZone: 'America/Sao_Paulo',
        },
        end: {
          dateTime: '2023-09-30T11:00:00',
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

      return response.data.hangoutLink;
    } catch (error) {
      console.error('Erro ao criar a reunião: ', error);
      throw error;
    }
  }
}
