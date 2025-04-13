import {
  IsString,
  IsUUID,
  IsArray,
  ValidateNested,
  IsEnum,
  IsBoolean,
} from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';

class CreateAnswerDto {
  @ApiProperty({ description: 'Answer text' })
  @IsString()
  text: string;

  @ApiProperty({ description: 'Indicates if the answer is correct' })
  @IsBoolean()
  isCorrect: boolean;
}

class CreateQuestionDto {
  @ApiProperty({ description: 'Question text' })
  @IsString()
  text: string;

  @ApiProperty({ enum: QuestionType, description: 'Type of the question' })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({
    type: [CreateAnswerDto],
    description: 'List of possible answers',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}

export class CreateQuizDto {
  @ApiProperty({ description: 'Title of the quiz' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Category ID for the quiz' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    type: [CreateQuestionDto],
    description: 'List of questions in the quiz',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
