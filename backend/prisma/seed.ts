//! before seeding add this line in package.json: "type": "module",
//! and then run in backend terminal: "yarn tsx prisma/seed"

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const [user1, user2, admin] = await Promise.all([
    prisma.user.create({
      data: {
        email: 'jure@gmail.com',
        password: 'jure123',
        username: 'jure',
        role: 'USER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'duje@gmail.com',
        password: 'duje123',
        username: 'duje',
        role: 'USER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'ivona@gmail.com',
        password: 'ivona123',
        username: 'ivona',
        role: 'ADMIN',
      },
    }),
  ]);

  const [scienceCategory, animalsCategory, foodCategory] = await Promise.all([
    prisma.category.create({ data: { name: 'Science', image: 'science.jpg' } }),
    prisma.category.create({ data: { name: 'Animals', image: 'animals.jpg' } }),
    prisma.category.create({ data: { name: 'Food', image: 'food.jpg' } }),
  ]);

  const [scienceQuiz, animalsQuiz1, animalsQuiz2, foodQuiz] = await Promise.all(
    [
      prisma.quiz.create({
        data: { title: 'Discover science', categoryId: scienceCategory.id },
      }),
      prisma.quiz.create({
        data: { title: 'Animal quiz of truth', categoryId: animalsCategory.id },
      }),
      prisma.quiz.create({
        data: { title: 'Animal trivia', categoryId: animalsCategory.id },
      }),
      prisma.quiz.create({
        data: { title: 'Are you wasting food?', categoryId: foodCategory.id },
      }),
    ],
  );

  const [q1, q2, q3, q4, q5] = await Promise.all([
    prisma.question.create({
      data: {
        text: 'What is the chemical symbol for water?',
        quizId: scienceQuiz.id,
        type: 'MULTIPLE_CHOICE',
      },
    }),
    prisma.question.create({
      data: {
        text: 'Photosynthesis is the process by which plants make food.',
        quizId: scienceQuiz.id,
        type: 'TRUE_FALSE',
      },
    }),
    prisma.question.create({
      data: {
        text: 'The Earth revolves around the ___.',
        quizId: scienceQuiz.id,
        type: 'FILL_IN_THE_BLANKS',
      },
    }),
    prisma.question.create({
      data: {
        text: 'Albert Einstein developed the theory of relativity.',
        quizId: scienceQuiz.id,
        type: 'TRUE_FALSE',
      },
    }),
    prisma.question.create({
      data: {
        text: 'The nearest star to Earth (after the Sun) is ___.',
        quizId: scienceQuiz.id,
        type: 'FILL_IN_THE_BLANKS',
      },
    }),
  ]);

  await prisma.answer.createMany({
    data: [
      { text: 'H2O', isCorrect: true, questionId: q1.id },
      { text: 'CO2', isCorrect: false, questionId: q1.id },
      { text: 'O2', isCorrect: false, questionId: q1.id },

      { text: 'true', isCorrect: true, questionId: q2.id },
      { text: 'sun', isCorrect: true, questionId: q3.id },
      { text: 'true', isCorrect: true, questionId: q4.id },
      { text: 'proxima centauri', isCorrect: true, questionId: q5.id },
    ],
  });

  const [q6, q7, q8, q9, q10] = await Promise.all([
    prisma.question.create({
      data: {
        text: 'Dolphins are mammals.',
        quizId: animalsQuiz1.id,
        type: 'TRUE_FALSE',
      },
    }),
    prisma.question.create({
      data: {
        text: 'Bats are blind.',
        quizId: animalsQuiz1.id,
        type: 'TRUE_FALSE',
      },
    }),
    prisma.question.create({
      data: {
        text: 'An octopus has ___ hearts.',
        quizId: animalsQuiz1.id,
        type: 'FILL_IN_THE_BLANKS',
      },
    }),
    prisma.question.create({
      data: {
        text: 'Which of these animals can climb trees?',
        quizId: animalsQuiz1.id,
        type: 'MULTIPLE_CHOICE',
      },
    }),
    prisma.question.create({
      data: {
        text: "A group of crows is called a 'murder'.",
        quizId: animalsQuiz1.id,
        type: 'TRUE_FALSE',
      },
    }),
  ]);

  await prisma.answer.createMany({
    data: [
      { text: 'true', isCorrect: true, questionId: q6.id },
      { text: 'false', isCorrect: true, questionId: q7.id },
      { text: '3', isCorrect: true, questionId: q8.id },

      { text: 'sloth', isCorrect: true, questionId: q9.id },
      { text: 'penguin', isCorrect: false, questionId: q9.id },
      { text: 'whale', isCorrect: false, questionId: q9.id },

      { text: 'true', isCorrect: true, questionId: q10.id },
    ],
  });

  const [q11, q12, q13, q14, q15] = await Promise.all([
    prisma.question.create({
      data: {
        text: 'Which of these animals is the fastest?',
        quizId: animalsQuiz2.id,
        type: 'MULTIPLE_CHOICE',
      },
    }),
    prisma.question.create({
      data: {
        text: 'The platypus lays eggs.',
        quizId: animalsQuiz2.id,
        type: 'TRUE_FALSE',
      },
    }),
    prisma.question.create({
      data: {
        text: 'A baby rabbit is called a ___.',
        quizId: animalsQuiz2.id,
        type: 'FILL_IN_THE_BLANKS',
      },
    }),
    prisma.question.create({
      data: {
        text: 'Which animal is known as the king of the jungle?',
        quizId: animalsQuiz2.id,
        type: 'MULTIPLE_CHOICE',
      },
    }),
    prisma.question.create({
      data: {
        text: 'Pandas mainly eat bamboo.',
        quizId: animalsQuiz2.id,
        type: 'TRUE_FALSE',
      },
    }),
  ]);

  await prisma.answer.createMany({
    data: [
      { text: 'cheetah', isCorrect: true, questionId: q11.id },
      { text: 'greyhound', isCorrect: false, questionId: q11.id },
      { text: 'peregrine falcon', isCorrect: false, questionId: q11.id },

      { text: 'true', isCorrect: true, questionId: q12.id },
      { text: 'kit', isCorrect: true, questionId: q13.id },

      { text: 'lion', isCorrect: true, questionId: q14.id },
      { text: 'tiger', isCorrect: false, questionId: q14.id },
      { text: 'leopard', isCorrect: false, questionId: q14.id },

      { text: 'true', isCorrect: true, questionId: q15.id },
    ],
  });

  const [q16, q17, q18, q19, q20] = await Promise.all([
    prisma.question.create({
      data: {
        text: 'Which fruit has seeds on the outside?',
        quizId: foodQuiz.id,
        type: 'MULTIPLE_CHOICE',
      },
    }),
    prisma.question.create({
      data: {
        text: 'Bread dough rises due to ___.',
        quizId: foodQuiz.id,
        type: 'FILL_IN_THE_BLANKS',
      },
    }),
    prisma.question.create({
      data: {
        text: 'Orzo is shaped like rice grains.',
        quizId: foodQuiz.id,
        type: 'TRUE_FALSE',
      },
    }),
    prisma.question.create({
      data: {
        text: 'Carrots get their color from beta-carotene.',
        quizId: foodQuiz.id,
        type: 'TRUE_FALSE',
      },
    }),
    prisma.question.create({
      data: {
        text: 'What ingredient is made by churning cream?',
        quizId: foodQuiz.id,
        type: 'MULTIPLE_CHOICE',
      },
    }),
  ]);

  await prisma.answer.createMany({
    data: [
      { text: 'strawberry', isCorrect: true, questionId: q16.id },
      { text: 'blueberry', isCorrect: false, questionId: q16.id },
      { text: 'cherry', isCorrect: false, questionId: q16.id },

      { text: 'yeast', isCorrect: true, questionId: q17.id },
      { text: 'true', isCorrect: true, questionId: q18.id },
      { text: 'true', isCorrect: true, questionId: q19.id },

      { text: 'butter', isCorrect: true, questionId: q20.id },
      { text: 'yogurt', isCorrect: false, questionId: q20.id },
      { text: 'cheese', isCorrect: false, questionId: q20.id },
    ],
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
