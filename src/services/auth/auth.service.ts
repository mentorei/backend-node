import { JWT } from '@fastify/jwt';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/dto/user/create-user.input';

@Injectable()
export class AuthService {
  constructor(private readonly $jwt: JWT) {}

  public generateAccess(user: CreateUserInput): any {
    const token = this.$jwt.sign({ name: user.name }, { sub: user.id, expiresIn: '7 days' });
    return { token };
  }
}
