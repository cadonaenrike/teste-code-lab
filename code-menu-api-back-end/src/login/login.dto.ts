import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  id?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
