import { Controller, Delete, Get, Post, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user.dto';
import { ResponseData } from 'src/common/globalClass';
import { HttpMessage, HttpStatus } from 'src/common/globalEnum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUer(): ResponseData<string> {
    try {
      return new ResponseData<string>(
        this.userService.getUer(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<string>(
        this.userService.getUer(),
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post('/test')
  createUser(@Body() userDto: UserDto): ResponseData<UserDto> {
    try {
      return new ResponseData<UserDto>(
        userDto,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<UserDto>(
        null,
        HttpStatus.ERROR,
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
