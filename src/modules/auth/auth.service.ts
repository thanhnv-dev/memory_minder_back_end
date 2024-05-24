import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { refreshTokenExpiresIn } from 'src/constants/config';
import { AuthResponseDto } from 'src/dto/auth.dto';
import { UserDto } from 'src/dto/user.dto';
import { HttpMessage } from 'src/enum/http-message.enum';
import { User } from 'src/schemas/user.schemas';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  checkUser = async (userDto: UserDto): Promise<boolean> => {
    try {
      const result: User | unknown = await this.userModel.findOne({
        email: userDto.email,
      });

      return result != undefined ? false : true;
    } catch (error) {
      throw error;
    }
  };

  createTokenAndRefreshToken = async (
    userDto: UserDto,
  ): Promise<{ token: string; refreshToken: string }> => {
    const payload = {
      email: userDto.email,
    };

    const token = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: refreshTokenExpiresIn,
    });

    return { token, refreshToken };
  };

  async signUp(userDto: UserDto): Promise<AuthResponseDto> {
    const resultCheckUser: boolean = await this.checkUser(userDto);

    if (resultCheckUser) {
      const newUser = await this.userModel.create(userDto);

      const { token, refreshToken } =
        await this.createTokenAndRefreshToken(userDto);

      return new AuthResponseDto({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: token,
        refreshToken: refreshToken,
      });
    } else {
      throw new Error(HttpMessage.EMAIL_EXISTS);
    }
  }
}
