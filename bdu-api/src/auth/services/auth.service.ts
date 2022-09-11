import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { JwtAccessToken } from '../models/jwt.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User>> {
    const user = await this.userService.findOneByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  public async login(user: User): Promise<JwtAccessToken> {
    const payload = {
      name: user.name,
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
