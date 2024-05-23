import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schemas';
import { UserDto } from '../../dto/user.dto';
import { AuthResponseDto } from '../../dto/auth.dto';

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
