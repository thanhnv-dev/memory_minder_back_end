import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthResponseDto } from 'src/dto/auth.dto';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/schemas/user.schemas';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: UserDto): Promise<AuthResponseDto> {
    const newUser = await this.userModel.create(userDto);

    const payload = { sub: newUser._id, email: newUser.email };

    return new AuthResponseDto({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN}`,
      }),
    });
  }
}
