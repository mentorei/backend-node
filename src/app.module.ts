import {
  SkillType,
  LevelType,
  DegreeType,
  GenderType,
  MaritalType,
  WeekdayType,
  PrismaClient,
  NotificationType,
  ConnectionStatusType,
  VerificationType,
} from '@prisma/client';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';

import { JwtStrategy } from './auth/auth.strategy';
import { OrderByEnum } from './enums/order-by.enum';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { SortingOrderEnum } from './enums/sorting-order.enum';
import { UserResolver } from './resolvers/user/user.resolver';
import { SkillService } from './services/skill/skill.service';
import { EmailService } from './services/email/email.service';
import { IsCPFValidator } from './validators/is-cpf.validator';
import { MentorService } from './services/mentor/mentor.service';
import { SkillResolver } from './resolvers/skill/skill.resolver';
import { MenteeService } from './services/mentee/mentee.service';
import { MentorResolver } from './resolvers/mentor/mentor.resolver';
import { MenteeResolver } from './resolvers/mentee/mentee.resolver';
import { GoogleMeetService } from './services/google/google-meet.service';
import { UserCompanyService } from './services/user/user-company.service';
import { UserAddressService } from './services/user/user-address.service';
import { UniqueUserCPFValidator } from './validators/unique-cpf.validator';
import { ConnectionService } from './services/connection/connection.service';
import { UniqueUserEmailValidator } from './validators/unique-email.validator';
import { ConnectionResolver } from './resolvers/connection/connection.resolver';
import { VerificationService } from './services/verification/verification.service';
import { NotificationService } from './services/notification/notification.service';
import { MentorEvaluationService } from './services/mentor/mentor-evaluation.service';
import { NotificationResolver } from './resolvers/notification/notification.resolver';
import { MentorEvaluationResolver } from './resolvers/mentor/mentor-evaluation.resolver';
import { MentorAvailabilityService } from './services/mentor/mentor-availability.service';
import { MentorAvailabilityResolver } from './resolvers/mentor/mentor-availability.resolver';

const RESOLVERS = [
  UserResolver,
  SkillResolver,
  MentorResolver,
  MenteeResolver,
  ConnectionResolver,
  NotificationResolver,
  MentorEvaluationResolver,
  MentorAvailabilityResolver,
];

const SERVICES = [
  AuthService,
  UserService,
  EmailService,
  SkillService,
  MentorService,
  MenteeService,
  GoogleMeetService,
  ConnectionService,
  UserAddressService,
  UserCompanyService,
  VerificationService,
  NotificationService,
  MentorEvaluationService,
  MentorAvailabilityService,
];

const VALIDATORS = [IsCPFValidator, UniqueUserEmailValidator, UniqueUserCPFValidator];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      plugins: [ApolloServerPluginInlineTrace()],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '3 days' },
    }),
  ],
  providers: [...RESOLVERS, ...SERVICES, ...VALIDATORS, JwtStrategy, PrismaClient],
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

    registerEnumType(SortingOrderEnum, {
      name: 'SortingOrderEnum',
      description: 'These are the supported statuses for sorting order.',
    });

    registerEnumType(OrderByEnum, {
      name: 'OrderByEnum',
      description: 'These are the supported statuses for order by.',
    });

    registerEnumType(ConnectionStatusType, {
      name: 'ConnectionStatusType',
      description: 'Connection status to have more control over mentees and mentors.',
    });

    registerEnumType(NotificationType, {
      name: 'NotificationType',
      description: 'Type of notification for the app to carry out different actions.',
    });

    registerEnumType(SkillType, {
      name: 'SkillType',
      description: 'To differentiate skills between soft and hard.',
    });

    registerEnumType(VerificationType, {
      name: 'VerificationType',
      description: 'Types of checks existing in the app.',
    });
  }
}
