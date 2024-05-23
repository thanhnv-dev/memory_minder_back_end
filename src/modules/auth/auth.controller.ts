import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

import { AuthService } from './auth.service';

import { Response } from 'express';
import { UserDto } from '../../dto/user.dto';
import { AuthResponseDto } from '../../dto/auth.dto';
import { HttpMessage } from '../../enum/http-message.enum';
import { ResponseData } from '../../common/response-data';
import { Public } from '../../constants/public.decorator';
import { ResponseType } from '../../constants/type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/sign-up')
  async signUp(
    @Body() userDto: UserDto,
    @Res() res: Response,
  ): Promise<ResponseType<AuthResponseDto>> {
    try {
      return res.json(
        new ResponseData<AuthResponseDto>(
          await this.authService.signUp(userDto),
          HttpStatus.OK,
          HttpMessage.SUCCESS,
        ),
      );
    } catch (error: any) {
      return res.json(
        new ResponseData<AuthResponseDto>(null, HttpStatus.BAD_REQUEST, error),
      );
    }
  }
}
