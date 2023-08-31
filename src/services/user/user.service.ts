import { validate } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

import { UserInput } from '../../dto/user/user.input';
import { CreateUserDTO } from 'src/dto/user/create-user.input';
import { UpdateUserDTO } from 'src/dto/user/update-user.input';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';

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
      where: { id, deleted: null },
      include: {
        address: true,
        company: true,
        softSkills: true,
        hardSkills: true,
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
      where: { email, deleted: null },
    });

    if (!existingUser) {
      throw new Error('Não foi possível encontrar este usuário.');
    }

    return existingUser;
  }

  public async updateUser(user: UserInput): Promise<User> {
    const dto = new UpdateUserDTO();
    dto.id = user.id;
    dto.gender = user.gender;
    dto.document = user.document;
    dto.phoneNumber = user.phoneNumber;
    dto.birthDate = user.birthDate;
    dto.maritalStatus = user.maritalStatus;
    dto.company = user.company;
    dto.address = user.address;
    dto.mentee = user.mentee;
    dto.mentor = user.mentor;
    dto.hardSkills = user.hardSkills;
    dto.softSkills = user.softSkills;

    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new Error(Object.values(errors[0].constraints)[0]);
    }

    const existingUser = await this.$prisma.user.findUnique({ where: { id: user.id, deleted: null } });

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
        menteeId: user.menteeId,
        mentorId: user.mentorId,
        softSkills: user.softSkills ? { connect: user.softSkills.map((skill: any) => ({ id: skill.id })) } : undefined,
        hardSkills: user.hardSkills ? { connect: user.hardSkills.map((skill: any) => ({ id: skill.id })) } : undefined,
      },
    });
  }

  public async deleteUser(id: string): Promise<User> {
    const existingUser = await this.$prisma.user.findUnique({ where: { id, deleted: null } });

    if (!existingUser) {
      throw new Error('Usuário não encontrado.');
    }

    const result = await this.$prisma.user.update({ where: { id }, data: { deleted: new Date() } });

    return result;
  }
}
