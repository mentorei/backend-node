import { UseGuards } from '@nestjs/common';
import { Connection } from '@prisma/client';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConnectionService } from 'src/services/connection/connection.service';
import { ConnectionEntity } from 'src/entities/connection/connection.entity';
import { ConnectionInput } from 'src/dto/connection/connection.input';

@Resolver()
export class ConnectionResolver {
  constructor(private readonly $connection: ConnectionService) {}

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
  public createConnectionRequest(
    @Args('menteeId', { type: () => String }) menteeId: string,
    @Args('mentorId', { type: () => String }) mentorId: string,
    @Args('requestDescription', { type: () => String }) requestDescription: string,
    @Args('mentorAvailabilityId', { type: () => String }) mentorAvailabilityId: string
  ): Promise<Connection> {
    const connection = new ConnectionInput();
    connection.menteeId = menteeId;
    connection.mentorId = mentorId;
    connection.requestDescription = requestDescription;
    connection.mentorAvailabilityId = mentorAvailabilityId;

    return this.$connection.createConnection(connection);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ConnectionEntity, { name: 'acceptConnection' })
  public acceptConnection(@Args('id', { type: () => String }) id: string): Promise<Connection> {
    return this.$connection.acceptConnection(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ConnectionEntity, { name: 'declineConnection' })
  public declineConnection(@Args('id', { type: () => String }) id: string): Promise<Connection> {
    return this.$connection.declineConnection(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ConnectionEntity, { name: 'pauseConnection' })
  public pauseConnection(@Args('id', { type: () => String }) id: string): Promise<Connection> {
    return this.$connection.pauseConnection(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ConnectionEntity, { name: 'finishConnection' })
  public finishConnection(@Args('id', { type: () => String }) id: string): Promise<Connection> {
    return this.$connection.finishConnection(id);
  }
}
