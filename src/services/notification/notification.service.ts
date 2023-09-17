import { Injectable } from '@nestjs/common';
import { Notification, PrismaClient } from '@prisma/client';

import { NotificationInput } from 'src/dto/notification/notification.input';

@Injectable()
export class NotificationService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async createNotification(notification: NotificationInput): Promise<Notification> {
    return this.$prisma.notification.create({
      data: {
        userId: notification.userId,
        type: notification.type,
        title: notification.title,
        description: notification.description,
      },
    });
  }

  public async getAllNotifications(userId: string): Promise<Notification[]> {
    return this.$prisma.notification.findMany({
      where: { userId, deleted: null },
      include: {
        user: {
          include: {
            company: true,
            address: true,
            skills: true,
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

  public async getNotificationById(id: string): Promise<Notification> {
    const notification = await this.$prisma.notification.findUnique({
      where: { id, deleted: null },
    });

    if (!notification) {
      throw new Error('Não foi possível encontrar esta notificação.');
    }

    return notification;
  }

  public async updateNotification(id: string): Promise<Notification> {
    await this.getNotificationById(id);

    return this.$prisma.notification.update({
      where: { id },
      data: {
        read: true,
      },
    });
  }

  public async deleteNotification(id: string): Promise<Notification> {
    await this.getNotificationById(id);

    const result = await this.$prisma.notification.update({ where: { id }, data: { deleted: new Date() } });

    return result;
  }
}
