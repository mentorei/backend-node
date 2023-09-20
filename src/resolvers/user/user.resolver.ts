import { UseGuards } from '@nestjs/common';
import { GenderType, MaritalType, User } from '@prisma/client';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { isNotEmpty } from 'src/utils/utils';
import { SendEmail } from 'src/utils/sendEmails';
import { UserInput } from 'src/dto/user/user.input';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from 'src/entities/user/user.entity';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/user/user.service';
import { SkillService } from 'src/services/skill/skill.service';
import { MentorService } from 'src/services/mentor/mentor.service';
import { MenteeService } from 'src/services/mentee/mentee.service';
import { UserAuthEntity } from 'src/entities/user/user-auth.entity';
import { UpsertMentorInput } from 'src/dto/mentor/upsert-mentor.input';
import { UpsertMenteeInput } from 'src/dto/mentee/upsert-mentee.input';
import { UpdateUserEntity } from 'src/entities/user/update-user.entity';
import { UserAddressService } from 'src/services/user/user-address.service';
import { UserCompanyService } from 'src/services/user/user-company.service';
import { UpsertUserAddressInput } from 'src/dto/user/user-address/upsert-user-address.input';
import { UpsertUserCompanyInput } from 'src/dto/user/user-company/upsert-user-company.input';

@Resolver()
export class UserResolver {
  constructor(
    private $user: UserService,
    private $auth: AuthService,
    private $skill: SkillService,
    private $mentor: MentorService,
    private $mentee: MenteeService,
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
    user.password = password;
    const userCreated = await this.$user.createUser(user);

    user.id = userCreated.id;
    const token = this.$auth.generateAccess(user);

    const userAuth = new UserAuthEntity();
    userAuth.email = userCreated.email;
    userAuth.name = userCreated.name;
    userAuth.id = userCreated.id;
    userAuth.token = token;

    SendEmail(user.name, user.email);

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
    userAuth.name = userLogin.name;
    userAuth.email = userLogin.email;
    userAuth.token = token;

    return userAuth;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UpdateUserEntity, { name: 'updateUser' })
  public async updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('gender', { type: () => GenderType, nullable: true }) gender?: GenderType,
    @Args('document', { type: () => String, nullable: true }) document?: string,
    @Args('avatar', { type: () => String, nullable: true }) avatar?: string,
    @Args('phoneNumber', { type: () => String, nullable: true }) phoneNumber?: string,
    @Args('birthDate', { type: () => String, nullable: true }) birthDate?: string,
    @Args('maritalStatus', { type: () => MaritalType, nullable: true }) maritalStatus?: MaritalType,
    @Args('address', { type: () => UpsertUserAddressInput, nullable: true }) address?: any,
    @Args('company', { type: () => UpsertUserCompanyInput, nullable: true }) company?: any,
    @Args('mentor', { type: () => UpsertMentorInput, nullable: true }) mentor?: any,
    @Args('mentee', { type: () => UpsertMenteeInput, nullable: true }) mentee?: any,
    @Args('skills', { type: () => [String], nullable: true }) skills?: Array<string>
  ): Promise<User> {
    const userInput = new UserInput();
    userInput.id = id;
    userInput.gender = gender;
    userInput.document = document;
    userInput.avatar = avatar;
    userInput.phoneNumber = phoneNumber;
    userInput.birthDate = birthDate;
    userInput.maritalStatus = maritalStatus;

    if (address && isNotEmpty(address)) {
      const userAddress = await this.$userAddress.upsertUserAddress(address);
      userInput.addressId = userAddress.id;
    }

    if (company && isNotEmpty(company)) {
      const userCompany = await this.$userCompany.upsertUserCompany(company);
      userInput.companyId = userCompany.id;
    }

    if (mentor && isNotEmpty(mentor)) {
      const dataMentor = await this.$mentor.upsertMentor(mentor);
      userInput.mentorId = dataMentor.id;
    }

    if (mentee && isNotEmpty(mentee)) {
      const dataMentee = await this.$mentee.upsertMentee(mentee);
      userInput.menteeId = dataMentee.id;
    }

    if (skills && skills.length > 0) {
      const dataSkills = await this.$skill.getManySkillById(skills);
      userInput.skills = dataSkills;
    }

    const updateUser = await this.$user.updateUser(userInput);

    return updateUser;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserEntity, { name: 'deleteUser' })
  public deleteUser(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.$user.deleteUser(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity, { name: 'getUserById' })
  public getUserById(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.$user.getUserById(id);
  }
}
