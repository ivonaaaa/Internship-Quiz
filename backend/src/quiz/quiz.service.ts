import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async getQuizQuestions(id: string) {
    return this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });
  }

  async submitQuiz(id: string, answers: any) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    let score = 0;
    quiz?.questions.forEach((question, index) => {
      const correctAnswer = question.answers.find((answer) => answer.isCorrect);
      if (answers[index] === correctAnswer?.id) {
        score += 1;
      }
    });

    return { score };
  }
}
