import { UseGuards } from '@nestjs/common';
import { Connection } from '@prisma/client';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConnectionInput } from 'src/dto/connection/connection.input';
import { NotificationInput } from 'src/dto/notification/notification.input';
import { ConnectionEntity } from 'src/entities/connection/connection.entity';
import { ConnectionService } from 'src/services/connection/connection.service';
import { NotificationService } from 'src/services/notification/notification.service';

@Resolver()
export class ConnectionResolver {
  constructor(private $connection: ConnectionService, private $notification: NotificationService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [ConnectionEntity], { name: 'getAllConnections' })
  public getAllConnections(): Promise<Connection[]> {
    return this.$connection.getAllConnections();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => ConnectionEntity, { name: 'getConnectionById' })
  public getConnectionById(@Args('id', { type: () => String }) id: string): Promise<Connection> {
    return this.$connection.getConnectionById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ConnectionEntity, { name: 'createConnectionRequest' })
  public async createConnectionRequest(
    @Args('menteeId', { type: () => String }) menteeId: string,
    @Args('mentorId', { type: () => String }) mentorId: string,
    @Args('skillId', { type: () => String }) skillId: string,
    @Args('requestDescription', { type: () => String }) requestDescription: string,
    @Args('mentorAvailabilityId', { type: () => String }) mentorAvailabilityId: string
  ): Promise<ConnectionInput> {
    const connection = new ConnectionInput();
    connection.menteeId = menteeId;
    connection.mentorId = mentorId;
    connection.skillId = skillId;
    connection.requestDescription = requestDescription;
    connection.mentorAvailabilityId = mentorAvailabilityId;
    const response = await this.$connection.createConnection(connection);

    const notification = new NotificationInput();
    notification.title = 'Pedido de conexão';
    notification.description = 'Um novo pedido de conexão te espera.';
    notification.type = 'CONNECTION';
    notification.userId = response.mentor.user.id;
    this.$notification.createNotification(notification);

    return response;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ConnectionEntity, { name: 'acceptConnection' })
  public async acceptConnection(@Args('id', { type: () => String }) id: string): Promise<ConnectionInput> {
    const response = await this.$connection.acceptConnection(id);

    const notification = new NotificationInput();
    notification.title = 'Pedido de conexão aceito!';
    notification.description = 'Seu pedido de conexão foi aceito.';
    notification.type = 'CONNECTION';
    notification.userId = response.mentee.user.id;
    this.$notification.createNotification(notification);

    return response;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ConnectionEntity, { name: 'declineConnection' })
  public async declineConnection(@Args('id', { type: () => String }) id: string): Promise<ConnectionInput> {
    const response = await this.$connection.updateConnection(id, 'DECLINED');

    const notification = new NotificationInput();
    notification.title = 'Pedido de conexão declinado';
    notification.description = 'Seu pedido de conexão foi declinado.';
    notification.type = 'CONNECTION';
    notification.userId = response.mentee.user.id;
    this.$notification.createNotification(notification);

    return response;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ConnectionEntity, { name: 'pauseConnection' })
  public async pauseConnection(@Args('id', { type: () => String }) id: string): Promise<ConnectionInput> {
    const response = await this.$connection.updateConnection(id, 'PAUSED');

    const notification = new NotificationInput();
    notification.title = 'Pausa no mentorado';
    notification.description = 'Seu mentor solicitou uma pausa na mentoria.';
    notification.type = 'CONNECTION';
    notification.userId = response.mentee.user.id;
    this.$notification.createNotification(notification);

    return response;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ConnectionEntity, { name: 'finishConnection' })
  public async finishConnection(@Args('id', { type: () => String }) id: string): Promise<ConnectionInput> {
    const response = await this.$connection.updateConnection(id, 'FINISHED');

    const notification = new NotificationInput();
    notification.title = 'Mentorado finalizado';
    notification.description = 'Seu processo de mentoria foi finalizado.';
    notification.type = 'CONNECTION';
    notification.userId = response.mentee.user.id;
    this.$notification.createNotification(notification);

    return response;
  }
}
