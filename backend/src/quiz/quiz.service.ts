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

  async getAnswersByQuestionId(questionId: string) {
    return this.prisma.answer.findMany({
      where: { questionId },
    });
  }

  async submitQuiz(
    userId: string,
    quizId: string,
    answers: Record<string, string>,
  ) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: { include: { answers: true } } },
    });

    if (!quiz) throw new NotFoundException('Quiz not found!');

    let score = 0;
    let totalQuestions = quiz.questions.length;

    quiz.questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (!userAnswer) return;

      switch (question.type) {
        case 'MULTIPLE_CHOICE':
          const correctMCAnswer = question.answers.find(
            (answer) => answer.isCorrect,
          );
          const isCorrectMC = userAnswer === correctMCAnswer?.id;

          if (isCorrectMC) score += 1;
          break;

        case 'TRUE_FALSE':
          const correctTFAnswer = question.answers.find(
            (answer) => answer.isCorrect,
          );
          const isCorrectTF =
            userAnswer.toLowerCase() === correctTFAnswer?.text.toLowerCase();

          if (isCorrectTF) score += 1;
          break;

        case 'FILL_IN_THE_BLANKS':
          const correctTextAnswer = question.answers.find(
            (answer) => answer.isCorrect,
          );
          const isCorrectText =
            userAnswer.toLowerCase().trim() ===
            correctTextAnswer?.text.toLowerCase().trim();

          if (isCorrectText) score += 1;
          break;

        default:
          const correctAnswer = question.answers.find(
            (answer) => answer.isCorrect,
          );
          const isCorrectById = userAnswer === correctAnswer?.id;
          const isCorrectByText =
            userAnswer.toLowerCase() === correctAnswer?.text.toLowerCase();

          if (isCorrectById || isCorrectByText) score += 1;
          break;
      }
    });

    const percentageScore = Math.round((score / totalQuestions) * 100);

    const existingResult = await this.prisma.quizResult.findFirst({
      where: { userId, quizId },
    });

    if (existingResult) {
      return this.prisma.quizResult.update({
        where: { id: existingResult.id },
        data: { score: percentageScore },
      });
    } else {
      return this.prisma.quizResult.create({
        data: {
          userId,
          quizId,
          score: percentageScore,
        },
      });
    }
  }

  async createQuiz(userRole: string, createQuizDto: CreateQuizDto) {
    if (userRole !== 'ADMIN')
      throw new ForbiddenException('Only admins can create quizzes!');

    return this.prisma.quiz.create({
      data: {
        title: createQuizDto.title,
        categoryId: createQuizDto.categoryId,
        questions: {
          create: createQuizDto.questions.map((question) => ({
            text: question.text,
            answers: {
              create: question.answers.map((answer) => ({
                text: answer.text,
                isCorrect: answer.isCorrect,
              })),
            },
            type: question.type,
          })),
        },
      },
    });
  }
}
