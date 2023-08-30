import { Injectable } from '@nestjs/common';
import { PrismaClient, UserAddress } from '@prisma/client';

import { UpsertUserAddressInput } from 'src/dto/user-address/upsert-user-address.input';

@Injectable()
export class UserAddressService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async upsertUserAddress(userAddress: UpsertUserAddressInput): Promise<UserAddress> {
    return this.$prisma.userAddress.upsert({
      where: { id: userAddress.id || '' },
      create: {
        postalCode: userAddress.postalCode,
        state: userAddress.state,
        street: userAddress.street,
        city: userAddress.city,
        country: userAddress.country,
        complement: userAddress.complement,
        neighborhood: userAddress.neighborhood,
        number: userAddress.number,
      },
      update: {
        postalCode: userAddress.postalCode,
        state: userAddress.state,
        street: userAddress.street,
        city: userAddress.city,
        country: userAddress.country,
        complement: userAddress.complement,
        neighborhood: userAddress.neighborhood,
        number: userAddress.number,
      },
    });
  }
}
