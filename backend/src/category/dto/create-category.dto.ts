import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Name of the category' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Image URL of the category' })
  @IsString()
  image: string;
}
