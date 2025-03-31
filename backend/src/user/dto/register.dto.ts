import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from '@nestjs/class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
