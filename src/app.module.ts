import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';

import { DegreeType, GenderType, LevelType, MaritalType, PrismaClient, WeekdayType } from '@prisma/client';
import { UserService } from './services/user/user.service';
import { UserResolver } from './resolvers/user/user.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    ConfigModule.forRoot({
      /* envFilePath: ['.env.development.local', '.env.development'], */
      isGlobal: true,
      cache: true,
    }),
  ],
  providers: [UserService, PrismaClient, UserResolver],
})
export class AppModule {
  constructor() {
    registerEnumType(GenderType, {
      name: 'GenderType',
      description: 'These are the supported statuses for genre types.',
    });

    registerEnumType(MaritalType, {
      name: 'MaritalType',
      description: 'These are the supported statuses for marital status.',
    });

    registerEnumType(LevelType, {
      name: 'LevelType',
      description: 'These are the supported statuses for knowledge level.',
    });

    registerEnumType(DegreeType, {
      name: 'DegreeType',
      description: 'These are the supported statuses for graduation.',
    });

    registerEnumType(WeekdayType, {
      name: 'WeekdayType',
      description: 'These are the supported statuses for the days of the week.',
    });
  }
}
