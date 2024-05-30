import { MinLength, IsEmail, IsNotEmpty, IsEmpty } from 'class-validator';

export class UserDto {
  @IsEmpty()
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
