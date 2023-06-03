import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserInput } from 'src/dto/user/user.input';

@Injectable()
export class AuthService {
  constructor(private readonly $jwt: JwtService) {}

  public generateAccess(user: UserInput): string {
    return this.$jwt.sign({ userId: user.id, name: user.name });
  }
}
