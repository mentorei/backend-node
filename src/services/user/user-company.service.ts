import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, UserCompany } from '@prisma/client';

import { UpsertUserCompanyInput } from 'src/dto/user/user-company/upsert-user-company.input';

@Injectable()
export class UserCompanyService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async upsertUserCompany(userCompany: UpsertUserCompanyInput): Promise<UserCompany> {
    const data: Prisma.UserCompanyUncheckedCreateInput = {
      name: userCompany.name,
      responsibility: userCompany.responsibility,
    };

    return this.$prisma.userCompany.upsert({
      where: { id: userCompany.id },
      create: data,
      update: data,
    });
  }
}
