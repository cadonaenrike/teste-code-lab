/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}

  async findByEmail(email: string): Promise<LoginDto | undefined> {
    if (email === 'admin@admin.com') {
      return {
        id: '1',
        email: 'admin@admin.com',
        password: await bcrypt.hash('admin123', 10),
      };
    }
    return undefined;
  }
  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<LoginDto | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async generateJwtToken(user: LoginDto): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
