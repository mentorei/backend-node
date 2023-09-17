import { Injectable } from '@nestjs/common';
import { Connection, ConnectionStatusType, PrismaClient } from '@prisma/client';

import { GoogleMeetService } from '../google/google-meet.service';
import { ConnectionInput } from 'src/dto/connection/connection.input';

@Injectable()
export class ConnectionService {
  constructor(private readonly $prisma: PrismaClient, private $googleMeet: GoogleMeetService) {}

  public async createConnection(connection: ConnectionInput): Promise<ConnectionInput> {
    return this.$prisma.connection.create({
      data: {
        status: 'CREATED',
        skillId: connection.skillId,
        requestDescription: connection.requestDescription,
        menteeId: connection.menteeId,
        mentorId: connection.mentorId,
        mentorAvailabilityId: connection.mentorAvailabilityId,
      },
      include: {
        mentor: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  public async getAllConnections(): Promise<Connection[]> {
    return this.$prisma.connection.findMany({
      where: { deleted: null },
      include: {
        mentee: {
          include: {
            user: {
              include: {
                company: true,
                address: true,
                skills: true,
              },
            },
          },
        },
        mentor: {
          include: {
            availabilities: true,
            evaluations: true,
            user: {
              include: {
                company: true,
                address: true,
                skills: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  public async getConnectionById(id: string): Promise<Connection> {
    const connection = await this.$prisma.connection.findUnique({
      where: { id, deleted: null },
      include: {
        skill: true,
        mentorAvailability: true,
        mentee: {
          include: {
            user: {
              include: {
                company: true,
                address: true,
                skills: true,
              },
            },
          },
        },
        mentor: {
          include: {
            availabilities: true,
            evaluations: true,
            user: {
              include: {
                company: true,
                address: true,
                skills: true,
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

  public async acceptConnection(id: string): Promise<ConnectionInput> {
    const connection = await this.getConnectionById(id);

    const meetUrl = await this.$googleMeet.createMeetingEvent(connection);

    return this.$prisma.connection.update({
      where: { id },
      data: {
        status: 'IN_PROGRESS',
        meetUrl,
      },
      include: {
        mentee: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  public async updateConnection(id: string, status: ConnectionStatusType): Promise<ConnectionInput> {
    await this.getConnectionById(id);

    return this.$prisma.connection.update({
      where: { id },
      data: {
        status,
      },
      include: {
        mentee: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  public async validateConnection(mentorId: string, menteeId: string): Promise<Connection> {
    const connection = await this.$prisma.connection.findFirst({
      where: { mentorId, menteeId, status: 'FINISHED', deleted: null },
    });

    if (!connection) {
      throw new Error('Seu mentor ainda não finalizou a conexão. Tente novamente mais tarde.');
    }

    return connection;
  }
}
