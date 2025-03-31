import { IsString } from '@nestjs/class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  image: string;
}
