import { User } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { encodePassword } from 'src/utils/bcrypt';
import { UserInput } from 'src/dto/user/user.input';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from 'src/entities/user/user.entity';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/user/user.service';
import { UserAuthEntity } from 'src/entities/user/user-auth.entity';

@Resolver()
export class UserResolver {
  constructor(private readonly $user: UserService, private readonly $auth: AuthService) {}

  @Mutation(() => UserAuthEntity, { name: 'createUser' })
  public async createUser(
    @Args('email', { type: () => String }) email: string,
    @Args('name', { type: () => String }) name: string,
    @Args('cpf', { type: () => String }) cpf: string,
    @Args('password', { type: () => String }) password: string
  ): Promise<UserAuthEntity> {
    const user = new UserInput();
    user.email = email;
    user.cpf = cpf;
    user.name = name;
    user.password = await encodePassword(password);

    const userCreated = await this.$user.createUser(user);
    const token = this.$auth.generateAccess(user);

    const userAuth = new UserAuthEntity();
    userAuth.email = userCreated.email;
    userAuth.name = userCreated.name;
    userAuth.id = userCreated.id;
    userAuth.token = token;

    return userAuth;
  }

  @Mutation(() => UserAuthEntity, { name: 'login' })
  public async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string
  ): Promise<UserAuthEntity> {
    const user = new UserInput();
    user.email = email;
    user.password = password;

    const userLogin = await this.$user.login(user);
    const token = this.$auth.generateAccess(user);

    const userAuth = new UserAuthEntity();
    userAuth.id = userLogin.id;
    userAuth.token = token;

    return userAuth;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity, { name: 'getUserById' })
  public getUserById(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.$user.getUserById(id);
  }
}
