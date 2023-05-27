import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

import { CreateUserInput } from '../../dto/user/create-user.input';

@Injectable()
export class UserService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async createUser(user: CreateUserInput): Promise<void | User> {
    return this.$prisma.user.create({
      data: {
        email: user.email,
        cpf: user.cpf,
        name: user.name,
        password: user.password,
        gender: user.gender,
        document: user.document,
        phoneNumber: user.phoneNumber,
        birthDate: user.birthDate,
        maritalStatus: user.maritalStatus,
      },
    });
  }

  public async getAllUsers(): Promise<User[]> {
    return this.$prisma.user.findMany({
      include: {
        address: true,
        company: true,
        softSkill: true,
        hardSkill: true,
      },
    });
  }

  public async getUserById(id: string): Promise<string | User> {
    const user = await this.$prisma.user.findUnique({
      where: { id },
      include: {
        address: true,
        company: true,
        softSkill: true,
        hardSkill: true,
      },
    });

    if (!user) {
      throw new Error('Não foi possível encontrar este usuário.');
    }

    return user;
  }

  public async updateUser(user: CreateUserInput): Promise<User> {
    const existingUser = await this.$prisma.user.findUnique({ where: { id: user.id } });

    if (!existingUser) {
      throw new Error('Usuário não encontrado.');
    }

    return this.$prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        cpf: user.cpf,
        name: user.name,
        password: user.password,
        gender: user.gender,
        document: user.document,
        phoneNumber: user.phoneNumber,
        birthDate: user.birthDate,
        maritalStatus: user.maritalStatus,
      },
    });
  }

  public async deleteUser(id: string): Promise<User> {
    const existingUser = await this.$prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      throw new Error('Usuário não encontrado.');
    }

    const result = await this.$prisma.user.delete({ where: { id } });

    return result;
  }
}
