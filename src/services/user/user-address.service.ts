import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, UserAddress } from '@prisma/client';

import { UpsertUserAddressInput } from 'src/dto/user/user-address/upsert-user-address.input';

@Injectable()
export class UserAddressService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async upsertUserAddress(userAddress: UpsertUserAddressInput): Promise<UserAddress> {
    const data: Prisma.UserAddressUncheckedCreateInput = {
      postalCode: userAddress.postalCode,
      state: userAddress.state,
      street: userAddress.street,
      city: userAddress.city,
      country: userAddress.country,
      complement: userAddress.complement,
      neighborhood: userAddress.neighborhood,
      number: userAddress.number,
    };

    return this.$prisma.userAddress.upsert({
      where: { id: userAddress.id },
      create: data,
      update: data,
    });
  }
}
