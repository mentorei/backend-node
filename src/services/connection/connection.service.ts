import { Injectable } from '@nestjs/common';
import { Connection, PrismaClient } from '@prisma/client';

import { GoogleMeetService } from '../google/google-meet.service';
import { ConnectionInput } from 'src/dto/connection/connection.input';

@Injectable()
export class ConnectionService {
  constructor(private readonly $prisma: PrismaClient, private readonly $googleMeet: GoogleMeetService) {}

  public async createConnection(connection: ConnectionInput): Promise<Connection> {
    return this.$prisma.connection.create({
      data: {
        status: 'CREATED',
        requestDescription: connection.requestDescription,
        menteeId: connection.menteeId,
        mentorId: connection.mentorId,
        mentorAvailabilityId: connection.mentorAvailabilityId,
      },
    });
  }

  public async getAllConnections(): Promise<Connection[]> {
    return this.$prisma.connection.findMany({
      where: { deleted: null },
      include: {
        mentee: {
          include: {
            User: {
              include: {
                company: true,
                address: true,
                softSkills: true,
                hardSkills: true,
              },
            },
          },
        },
        mentor: {
          include: {
            availability: true,
            evaluation: true,
            User: {
              include: {
                company: true,
                address: true,
                softSkills: true,
                hardSkills: true,
              },
            },
          },
        },
      },
    });
  }

  public async getConnectionById(id: string): Promise<Connection> {
    const connection = await this.$prisma.connection.findUnique({
      where: { id, deleted: null },
      include: {
        mentee: {
          include: {
            User: {
              include: {
                company: true,
                address: true,
                softSkills: true,
                hardSkills: true,
              },
            },
          },
        },
        mentor: {
          include: {
            availability: true,
            evaluation: true,
            User: {
              include: {
                company: true,
                address: true,
                softSkills: true,
                hardSkills: true,
              },
            },
          },
        },
      },
    });

    if (!connection) {
      throw new Error('Não foi possível encontrar esta conexão.');
    }

    return connection;
  }

  public async acceptConnection(id: string): Promise<Connection> {
    const connection = await this.getConnectionById(id);

    const meetUrl = await this.$googleMeet.createMeetingEvent(connection);

    return this.$prisma.connection.update({
      where: { id },
      data: {
        status: 'IN_PROGRESS',
        meetUrl,
      },
    });
  }

  public async pauseConnection(id: string): Promise<Connection> {
    this.getConnectionById(id);

    return this.$prisma.connection.update({
      where: { id },
      data: {
        status: 'PAUSED',
      },
    });
  }

  public async declineConnection(id: string): Promise<Connection> {
    this.getConnectionById(id);

    return this.$prisma.connection.update({
      where: { id },
      data: {
        status: 'DECLINED',
      },
    });
  }

  public async finishConnection(id: string): Promise<Connection> {
    this.getConnectionById(id);

    return this.$prisma.connection.update({
      where: { id },
      data: {
        status: 'FINISHED',
      },
    });
  }
}
