import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get(':id/questions')
  async getQuizQuestions(@Param('id') id: string) {
    return this.quizService.getQuizQuestions(id);
  }

  @Post(':id/submit')
  async submitQuiz(
    @Param('id') quizId: string,
    @Body() body: { userId: string; answers: any },
  ) {
    return this.quizService.submitQuiz(body.userId, quizId, body.answers);
  }
}
