import { Injectable } from '@nestjs/common';
import { PrismaClient, UserCompany } from '@prisma/client';

import { UserCompanyInput } from 'src/dto/user-company/user-company.input';

@Injectable()
export class UserCompanyService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async upsertUserCompany(userCompany: UserCompanyInput): Promise<UserCompany> {
    return this.$prisma.userCompany.upsert({
      where: { id: userCompany.id || '' },
      create: {
        name: userCompany.name,
        responsibility: userCompany.responsibility,
      },
      update: {
        name: userCompany.name,
        responsibility: userCompany.responsibility,
      },
    });
  }
}
