import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseData } from '../../common/response-data';
import { HttpMessage } from '../../enum/http-message.enum';
import { Public } from '../../constants/public.decorator';
import { UserDto } from '../../dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUer(): ResponseData<string> {
    try {
      return new ResponseData<string>(
        this.userService.getUer(),
        HttpStatus.OK,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<string>(
        this.userService.getUer(),
        HttpStatus.OK,
        HttpMessage.ERROR,
      );
    }
  }

  @Public()
  @Post()
  createUser(@Body() userDto: UserDto): ResponseData<UserDto> {
    try {
      return new ResponseData<UserDto>(
        userDto,
        HttpStatus.OK,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<UserDto>(
        null,
        HttpStatus.BAD_REQUEST,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:id')
  getProfile(): string {
    return this.userService.getProfile();
  }

  @Put('/:id')
  updateUser(): string {
    return this.userService.updateUser();
  }

  @Delete('/:id')
  deleteUser(): string {
    return this.userService.deleteUser();
  }
}
