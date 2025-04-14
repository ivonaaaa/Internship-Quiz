import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('results')
  async getAllResults() {
    return this.userService.getAllQuizResults();
  }

  @Post('register')
  register(@Body() { email, password }: RegisterDto) {
    return this.userService.register(email, password);
  }

  @Post('login')
  login(@Body() { email, password }: LoginDto) {
    return this.userService.login(email, password);
  }
}
