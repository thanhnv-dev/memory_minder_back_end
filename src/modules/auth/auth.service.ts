import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthResponseDto } from 'src/dto/auth.dto';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/schemas/user.schemas';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signUp(userDto: UserDto): Promise<AuthResponseDto> {
    const newUser = await this.userModel.create(userDto);

    return new AuthResponseDto({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: 'token',
      refresh_token: 'refresh_token',
    });
  }
}
