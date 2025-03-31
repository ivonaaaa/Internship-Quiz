import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async register(email: string, password: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists!');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username: email.split('@')[0],
        role: Role.USER,
      },
    });

    const payload = {
      id: user.id,
      email: user.email,
      role: 'user',
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('User does not exist!');
    }

    const isPasswordValid = await compare(password, user.password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      throw new ForbiddenException('Password not valid!');
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
