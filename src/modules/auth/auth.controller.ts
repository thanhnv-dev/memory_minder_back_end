import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ResponseData } from 'src/common/response-data';
import { Public } from 'src/constants/public.decorator';
import { UserDto } from 'src/dto/user.dto';
import { HttpMessage } from 'src/enum/http-message.enum';
import { AuthService } from './auth.service';
import { AuthResponseDto } from 'src/dto/auth.dto';
import { ResponseType } from 'src/constants/type';
import { Response } from 'express';

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
    } catch (error) {
      return res.json(
        new ResponseData<AuthResponseDto>(null, HttpStatus.BAD_REQUEST, error),
      );
    }
  }
}
