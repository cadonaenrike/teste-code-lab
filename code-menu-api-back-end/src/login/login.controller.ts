import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './login.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    if (!email) {
      return { accessToken: null, message: 'E-mail não fornecido' };
    }

    if (!password) {
      return { accessToken: null, message: 'Senha não fornecida' };
    }

    const user = await this.userService.findByEmail(email);

    if (!user) {
      return { accessToken: null, message: 'Usuário não encontrado' };
    }

    const isPasswordValid = await this.userService.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return { accessToken: null, message: 'Senha incorreta' };
    }

    const accessToken = await this.userService.generateJwtToken(user);

    return { accessToken };
  }
}
