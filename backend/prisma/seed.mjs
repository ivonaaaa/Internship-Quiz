import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const user1 = await prisma.user.create({
    data: {
      email: "jure@gmail.com",
      password: "jure123",
      role: "USER",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "duje@gmail.com",
      password: "duje123",
      role: "USER",
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: "ivona@gmail.com",
      password: "ivona123",
      role: "ADMIN",
    },
  });

  const scienceCategory = await prisma.category.create({
    data: {
      name: "Science",
      image: "science.jpg",
    },
  });

  const animalsCategory = await prisma.category.create({
    data: {
      name: "Animals",
      image: "animals.jpg",
    },
  });

  const foodCategory = await prisma.category.create({
    data: {
      name: "Food",
      image: "food.jpg",
    },
  });

  const scienceQuiz1 = await prisma.quiz.create({
    data: {
      title: "Discover science",
      categoryId: scienceCategory.id,
      type: "FILL_IN_THE_BLANKS",
    },
  });

  const animalsQuiz1 = await prisma.quiz.create({
    data: {
      title: "Animal quiz of truth",
      categoryId: animalsCategory.id,
      type: "TRUE_FALSE",
    },
  });

  const animalsQuiz2 = await prisma.quiz.create({
    data: {
      title: "Animal trivia",
      categoryId: animalsCategory.id,
      type: "MULTIPLE_CHOICE",
    },
  });

  const foodQuiz1 = await prisma.quiz.create({
    data: {
      title: "Are you waisting food?",
      categoryId: foodCategory.id,
      type: "MULTIPLE_CHOICE",
    },
  });

  //! science quiz 1
  const question1 = await prisma.question.create({
    data: {
      text: "___ is the chemical symbol for water.",
      quizId: scienceQuiz1.id,
    },
  });
  const question2 = await prisma.question.create({
    data: {
      text: "The process called ___ is how plants make their own food.",
      quizId: scienceQuiz1.id,
    },
  });
  const question3 = await prisma.question.create({
    data: {
      text: "The Earth revolves around the ___.",
      quizId: scienceQuiz1.id,
    },
  });
  const question4 = await prisma.question.create({
    data: {
      text: "Albert Einstein developed the theory of ___.",
      quizId: scienceQuiz1.id,
    },
  });
  const question5 = await prisma.question.create({
    data: {
      text: "The nearest star to Earth is ___, apart from the Sun.",
      quizId: scienceQuiz1.id,
    },
  });

  await prisma.answer.createMany({
    data: [
      { text: "h20", isCorrect: true, questionId: question1.id },
      { text: "photosynthesis", isCorrect: true, questionId: question2.id },
      { text: "sun", isCorrect: true, questionId: question3.id },
      { text: "relativity", isCorrect: true, questionId: question4.id },
      { text: "proxima centauri", isCorrect: true, questionId: question5.id },
    ],
  });

  //! animals quiz 1
  const question6 = await prisma.question.create({
    data: { text: "Dolphins are mammals.", quizId: animalsQuiz1.id },
  });
  const question7 = await prisma.question.create({
    data: { text: "Bats are blind.", quizId: animalsQuiz1.id },
  });
  const question8 = await prisma.question.create({
    data: { text: "An octopus has three hearts.", quizId: animalsQuiz1.id },
  });
  const question9 = await prisma.question.create({
    data: {
      text: "Cows can walk downstairs but not upstairs.",
      quizId: animalsQuiz1.id,
    },
  });
  const question10 = await prisma.question.create({
    data: {
      text: "A group of crows is called a 'murder'.",
      quizId: animalsQuiz1.id,
    },
  });

  await prisma.answer.createMany({
    data: [
      { text: "true", isCorrect: true, questionId: question6.id },
      { text: "false", isCorrect: true, questionId: question7.id },
      { text: "true", isCorrect: true, questionId: question8.id },
      { text: "false", isCorrect: true, questionId: question9.id },
      { text: "true", isCorrect: true, questionId: question10.id },
    ],
  });

  //! animals quiz 2
  const question11 = await prisma.question.create({
    data: {
      text: "Which of these animals is the fastest?",
      quizId: animalsQuiz2.id,
    },
  });
  const question12 = await prisma.question.create({
    data: { text: "Which mammal lays eggs?", quizId: animalsQuiz2.id },
  });
  const question13 = await prisma.question.create({
    data: { text: "What is a baby rabbit called?", quizId: animalsQuiz2.id },
  });
  const question14 = await prisma.question.create({
    data: {
      text: "Which animal is known as the 'king of the jungle'?",
      quizId: animalsQuiz2.id,
    },
  });
  const question15 = await prisma.question.create({
    data: { text: "What do pandas mainly eat?", quizId: animalsQuiz2.id },
  });

  await prisma.answer.createMany({
    data: [
      { text: "cheetah", isCorrect: true, questionId: question11.id },
      { text: "peregrine falcon", isCorrect: false, questionId: question11.id },
      { text: "greyhound", isCorrect: false, questionId: question11.id },

      { text: "platypus", isCorrect: true, questionId: question12.id },
      { text: "echidna", isCorrect: false, questionId: question12.id },
      { text: "armadillo", isCorrect: false, questionId: question12.id },

      { text: "kit", isCorrect: true, questionId: question13.id },
      { text: "cub", isCorrect: false, questionId: question13.id },
      { text: "pup", isCorrect: false, questionId: question13.id },

      { text: "lion", isCorrect: true, questionId: question14.id },
      { text: "tiger", isCorrect: false, questionId: question14.id },
      { text: "leopard", isCorrect: false, questionId: question14.id },

      { text: "bamboo", isCorrect: true, questionId: question15.id },
      { text: "fruits", isCorrect: false, questionId: question15.id },
      { text: "fish", isCorrect: false, questionId: question15.id },
    ],
  });

  //! food quiz 1
  const question16 = await prisma.question.create({
    data: {
      text: "Which fruit has seeds on the outside instead of inside?",
      quizId: foodQuiz1.id,
    },
  });

  const question17 = await prisma.question.create({
    data: {
      text: "Which type of pasta is shaped like little rice grains?",
      quizId: foodQuiz1.id,
    },
  });

  const question18 = await prisma.question.create({
    data: {
      text: "What gives carrots their orange color?",
      quizId: foodQuiz1.id,
    },
  });

  const question19 = await prisma.question.create({
    data: {
      text: "Which dairy product is made by churning cream?",
      quizId: foodQuiz1.id,
    },
  });

  const question20 = await prisma.question.create({
    data: {
      text: "What ingredient makes bread dough rise?",
      quizId: foodQuiz1.id,
    },
  });

  await prisma.answer.createMany({
    data: [
      { text: "strawberry", isCorrect: true, questionId: question16.id },
      { text: "blueberry", isCorrect: false, questionId: question16.id },
      { text: "cherry", isCorrect: false, questionId: question16.id },

      { text: "orzo", isCorrect: true, questionId: question17.id },
      { text: "penne", isCorrect: false, questionId: question17.id },
      { text: "fusilli", isCorrect: false, questionId: question17.id },

      { text: "beta-carotene", isCorrect: true, questionId: question18.id },
      { text: "chlorophyll", isCorrect: false, questionId: question18.id },
      { text: "anthocyanin", isCorrect: false, questionId: question18.id },

      { text: "butter", isCorrect: true, questionId: question19.id },
      { text: "yogurt", isCorrect: false, questionId: question19.id },
      { text: "cheese", isCorrect: false, questionId: question19.id },

      { text: "yeast", isCorrect: true, questionId: question20.id },
      { text: "baking soda", isCorrect: false, questionId: question20.id },
      { text: "salt", isCorrect: false, questionId: question20.id },
    ],
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
