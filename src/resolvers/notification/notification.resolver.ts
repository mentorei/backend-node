import { UseGuards } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { NotificationEntity } from 'src/entities/notification/notification.entity';
import { NotificationService } from 'src/services/notification/notification.service';

@Resolver()
export class NotificationResolver {
  constructor(private $notification: NotificationService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [NotificationEntity], { name: 'getAllNotifications' })
  public getAllNotifications(@Args('userId', { type: () => String }) userId: string): Promise<Notification[]> {
    return this.$notification.getAllNotifications(userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => NotificationEntity, { name: 'updateNotification' })
  public updateNotification(@Args('id', { type: () => String }) id: string): Promise<Notification> {
    return this.$notification.updateNotification(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => NotificationEntity, { name: 'deleteNotification' })
  public deleteNotification(@Args('id', { type: () => String }) id: string): Promise<Notification> {
    return this.$notification.deleteNotification(id);
  }
}
