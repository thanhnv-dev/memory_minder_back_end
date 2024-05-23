import { MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @MinLength(3)
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
