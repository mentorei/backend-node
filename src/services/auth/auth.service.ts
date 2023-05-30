import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/dto/user/create-user.input';

@Injectable()
export class AuthService {
  constructor(private readonly $jwt: JwtService) {}

  public generateAccess(user: CreateUserInput): string {
    return this.$jwt.sign({ userId: user.id, name: user.name });
  }
}
