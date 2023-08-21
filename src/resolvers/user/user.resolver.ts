import { UseGuards } from '@nestjs/common';
import { GenderType, MaritalType, User } from '@prisma/client';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { isNotEmpty } from 'src/utils/utils';
import { encodePassword } from 'src/utils/bcrypt';
import { UserInput } from 'src/dto/user/user.input';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from 'src/entities/user/user.entity';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/user/user.service';
import { UserAuthEntity } from 'src/entities/user/user-auth.entity';
import { UserCompanyInput } from 'src/dto/user-company/user-company.input';
import { UserAddressInput } from 'src/dto/user-address/user-address.input';
import { UserAddressService } from 'src/services/user-address/user-address.service';
import { UserCompanyService } from 'src/services/user-company/user-company.service';
import { SendEmail } from 'src/utils/sendEmails';

@Resolver()
export class UserResolver {
  constructor(
    private $user: UserService,
    private $auth: AuthService,
    private $userAddress: UserAddressService,
    private $userCompany: UserCompanyService
  ) {}

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

    
    SendEmail(user.name, user.email)

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

  @Mutation(() => UserEntity, { name: 'updateUser' })
  public async updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('gender', { type: () => GenderType, nullable: true }) gender?: GenderType,
    @Args('document', { type: () => String, nullable: true }) document?: string,
    @Args('phoneNumber', { type: () => String, nullable: true }) phoneNumber?: string,
    @Args('birthDate', { type: () => String, nullable: true }) birthDate?: string,
    @Args('maritalStatus', { type: () => MaritalType, nullable: true }) maritalStatus?: MaritalType,
    @Args('address', { type: () => UserAddressInput, nullable: true }) address?: UserAddressInput,
    @Args('company', { type: () => UserCompanyInput, nullable: true }) company?: UserCompanyInput
  ): Promise<UserEntity> {
    const userInput = new UserInput();
    userInput.id = id;
    userInput.gender = gender;
    userInput.document = document;
    userInput.phoneNumber = phoneNumber;
    userInput.birthDate = birthDate;
    userInput.maritalStatus = maritalStatus;

    if (isNotEmpty(address)) {
      const userAddress = await this.$userAddress.upsertUserAddress(address);
      userInput.addressId = userAddress.id;
    }

    if (isNotEmpty(company)) {
      const userCompany = await this.$userCompany.upsertUserCompany(company);
      userInput.companyId = userCompany.id;
    }

    const updateUser = await this.$user.updateUser(userInput);

    return updateUser;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity, { name: 'getUserById' })
  public getUserById(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.$user.getUserById(id);
  }
}
