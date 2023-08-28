import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { DegreeType, GenderType, LevelType, MaritalType, PrismaClient, WeekdayType } from '@prisma/client';

import { JwtStrategy } from './auth/auth.strategy';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { UserResolver } from './resolvers/user/user.resolver';
import { IsCPFValidator } from './validators/is-cpf.validator';
import { MentorService } from './services/mentor/mentor.service';
import { MenteeService } from './services/mentee/mentee.service';
import { MentorResolver } from './resolvers/mentor/mentor.resolver';
import { MenteeResolver } from './resolvers/mentee/mentee.resolver';
import { UniqueUserCPFValidator } from './validators/unique-cpf.validator';
import { HardSkillService } from './services/hard-skill/hard-skill.service';
import { SoftSkillService } from './services/soft-skill/soft-skill.service';
import { HardSkillResolver } from './resolvers/hard-skill/hard-skill.resolver';
import { UniqueUserEmailValidator } from './validators/unique-email.validator';
import { SoftSkillResolver } from './resolvers/soft-skill/soft-skill.resolver';
import { UserCompanyService } from './services/user-company/user-company.service';
import { UserAddressService } from './services/user-address/user-address.service';

const RESOLVERS = [UserResolver, MentorResolver, MenteeResolver, HardSkillResolver, SoftSkillResolver];

const SERVICES = [
  AuthService,
  UserService,
  MentorService,
  MenteeService,
  SoftSkillService,
  HardSkillService,
  UserAddressService,
  UserCompanyService,
];

const VALIDATORS = [IsCPFValidator, UniqueUserEmailValidator, UniqueUserCPFValidator];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
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
  }
}
