import { GenderType, MaritalType, User } from '@prisma/client';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { UserEntity } from 'src/entities/user/user.entity';
import { UserService } from 'src/services/user/user.service';
import { CreateUserInput } from 'src/dto/user/create-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly $user: UserService) {}

  @Mutation(() => UserEntity, { name: 'createUser' })
  public createUser(
    @Args('email', { type: () => String }) email: string,
    @Args('cpf', { type: () => String }) cpf: string,
    @Args('name', { type: () => String }) name: string,
    @Args('password', { type: () => String }) password: string,
    @Args('gender', { type: () => String, nullable: true }) gender: GenderType,
    @Args('document', { type: () => String, nullable: true }) document: string,
    @Args('phoneNumber', { type: () => String, nullable: true }) phoneNumber: string,
    @Args('birthDate', { type: () => String, nullable: true }) birthDate: string,
    @Args('maritalStatus', { type: () => String, nullable: true }) maritalStatus: MaritalType
  ): Promise<void | User> {
    const user = new CreateUserInput();
    user.email = email;
    user.cpf = cpf;
    user.name = name;
    user.password = password;
    user.gender = gender;
    user.document = document;
    user.phoneNumber = phoneNumber;
    user.birthDate = birthDate;
    user.maritalStatus = maritalStatus;
    return this.$user.createUser(user);
  }

  @Query(() => [UserEntity], { name: 'getAllUsers' })
  public getAllUsers(): Promise<User[]> {
    return this.$user.getAllUsers();
  }

  @Query(() => UserEntity, { name: 'getUserById' })
  public getUserById(@Args('id', { type: () => String }) id: string): Promise<string | User> {
    return this.$user.getUserById(id);
  }

  @Mutation(() => UserEntity, { name: 'updateUser' })
  public updateUser(
    @Args('email', { type: () => String }) email: string,
    @Args('cpf', { type: () => String }) cpf: string,
    @Args('name', { type: () => String }) name: string,
    @Args('password', { type: () => String }) password: string,
    @Args('gender', { type: () => String, nullable: true }) gender: GenderType,
    @Args('document', { type: () => String, nullable: true }) document: string,
    @Args('phoneNumber', { type: () => String, nullable: true }) phoneNumber: string,
    @Args('birthDate', { type: () => String, nullable: true }) birthDate: string,
    @Args('maritalStatus', { type: () => String, nullable: true }) maritalStatus: MaritalType
  ): Promise<User> {
    const user = new CreateUserInput();
    user.email = email;
    user.cpf = cpf;
    user.name = name;
    user.password = password;
    user.gender = gender;
    user.document = document;
    user.phoneNumber = phoneNumber;
    user.birthDate = birthDate;
    user.maritalStatus = maritalStatus;
    return this.$user.updateUser(user);
  }

  @Mutation(() => UserEntity, { name: 'deleteUser' })
  public deleteUser(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.$user.deleteUser(id);
  }
}
