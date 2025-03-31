import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllQuizzes() {
    return this.prisma.quiz.findMany();
  }

  async getQuizzesByCategory(category: string) {
    return this.prisma.quiz.findMany({
      where: { categoryId: category },
    });
  }

  async searchQuizzesByName(name: string) {
    return this.prisma.quiz.findMany({
      where: {
        title: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async getQuizQuestions(id: string) {
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

    if (!quiz) throw new NotFoundException('Quiz not found!');
    return quiz;
  }

  async submitQuiz(userId: string, quizId: string, answers: any) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: { include: { answers: true } } },
    });

    if (!quiz) throw new NotFoundException('Quiz not found!');

    let score = 0;
    quiz.questions.forEach((question, index) => {
      const correctAnswer = question.answers.find((answer) => answer.isCorrect);
      if (answers[index] === correctAnswer?.id) {
        score += 1;
      }
    });

    const existingResult = await this.prisma.quizResult.findFirst({
      where: { userId, quizId },
    });

    if (existingResult) {
      return this.prisma.quizResult.update({
        where: { id: existingResult.id },
        data: { score },
      });
    } else {
      return this.prisma.quizResult.create({
        data: { userId, quizId, score },
      });
    }
  }

  async getUserQuizAttempts(userId: string) {
    return this.prisma.quizResult.findMany({
      where: { userId },
      include: { quiz: true },
    });
  }

  async createQuiz(userRole: string, createQuizDto: CreateQuizDto) {
    if (userRole !== 'admin')
      throw new ForbiddenException('Only admins can create quizzes!');

    return this.prisma.quiz.create({
      data: {
        title: createQuizDto.title,
        categoryId: createQuizDto.categoryId,
        type: createQuizDto.type,
        questions: {
          create: createQuizDto.questions.map((question) => ({
            text: question.text,
            answers: {
              create: question.answers.map((answer) => ({
                text: answer.text,
                isCorrect: answer.isCorrect,
              })),
            },
          })),
        },
      },
    });
  }
}
