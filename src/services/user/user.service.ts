import { validate } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { UserInput } from '../../dto/user/user.input';
import { CreateUserDTO } from 'src/dto/user/create-user.input';

@Injectable()
export class UserService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async createUser(user: UserInput): Promise<User> {
    const dto = new CreateUserDTO();
    dto.name = user.name;
    dto.email = user.email;
    dto.password = user.password;
    dto.cpf = user.cpf;

    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new Error(Object.values(errors[0].constraints)[0]);
    }

    user.password = await encodePassword(user.password);

    return this.$prisma.user.create({
      data: {
        email: user.email,
        cpf: user.cpf,
        name: user.name,
        password: user.password,
      },
    });
  }

  public async login(user: UserInput): Promise<User> {
    const dbUser = await this.getUserByEmail(user.email);

    const matched = comparePassword(user.password, dbUser.password);

    if (!matched) {
      throw new Error('Email ou senha incorreta.');
    }

    return dbUser;
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this.$prisma.user.findUnique({
      where: { id },
      include: {
        address: true,
        company: true,
        softSkill: true,
        hardSkill: true,
        Mentee: true,
        Mentor: true,
      },
    });

    if (!user) {
      throw new Error('Não foi possível encontrar este usuário.');
    }

    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const existingUser = await this.$prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw new Error('Não foi possível encontrar este usuário.');
    }

    return existingUser;
  }

  public async updateUser(user: UserInput): Promise<User> {
    const existingUser = await this.$prisma.user.findUnique({ where: { id: user.id } });

    if (!existingUser) {
      throw new Error('Usuário não encontrado.');
    }

    return this.$prisma.user.update({
      where: { id: user.id },
      data: {
        gender: user.gender,
        document: user.document,
        phoneNumber: user.phoneNumber,
        birthDate: user.birthDate,
        maritalStatus: user.maritalStatus,
        companyId: user.companyId,
        addressId: user.addressId,
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
