import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { AdminAuthGuard } from 'src/user/admin-auth.guard';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async getAllQuizzes() {
    return this.quizService.getAllQuizzes();
  }

  @Get('category/:categoryId')
  async getQuizzesByCategory(@Param('categoryId') categoryId: string) {
    return this.quizService.getQuizzesByCategory(categoryId);
  }

  @Get('search')
  async searchQuizzes(@Query('name') name: string) {
    return this.quizService.searchQuizzesByName(name);
  }

  @Get(':id/questions')
  async getQuizQuestions(@Param('id') id: string) {
    return this.quizService.getQuizQuestions(id);
  }

  @Get(':id/questions/answers')
  async getAnswers(@Param('questionId') questionId: string) {
    return this.quizService.getAnswersByQuestionId(questionId);
  }

  @Post(':id/submit')
  async submitQuiz(
    @Param('id') quizId: string,
    @Body() body: { userId: string; answers: any },
  ) {
    return this.quizService.submitQuiz(body.userId, quizId, body.answers);
  }

  @Get(':quizId/results')
  async getQuizResults(@Param('quizId') quizId: string) {
    return this.quizService.getUserQuizAttempts(quizId);
  }

  @Get('user/:userId/attempts')
  async getUserQuizAttempts(@Param('userId') userId: string) {
    return this.quizService.getUserQuizAttempts(userId);
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  async createQuiz(@Request() req, @Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(req.user.role, createQuizDto);
  }
}
