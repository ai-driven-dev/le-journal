import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: { email: string; name?: string }) {
    return this.userService.createUser(userData);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}
