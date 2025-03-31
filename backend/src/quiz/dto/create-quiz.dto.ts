import {
  IsString,
  IsUUID,
  IsArray,
  ValidateNested,
  IsEnum,
} from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';
import { QuizType } from '@prisma/client';

class CreateAnswerDto {
  @IsString()
  text: string;

  @IsEnum([true, false])
  isCorrect: boolean;
}

class CreateQuestionDto {
  @IsString()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}

export class CreateQuizDto {
  @IsString()
  title: string;

  @IsUUID()
  categoryId: string;

  @IsEnum(QuizType)
  type: QuizType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
