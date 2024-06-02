import { IsEmail, MinLength } from 'class-validator'

export class CreateUserDto {

  @IsEmail()
  email: string;

  @MinLength(6, {message: 'Password is too short, at least 6 characters, please'})
  password: string;
}
