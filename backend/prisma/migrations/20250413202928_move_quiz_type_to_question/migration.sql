/*
  Warnings:

  - You are about to drop the column `type` on the `quizzes` table. All the data in the column will be lost.
  - Added the required column `type` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('TRUE_FALSE', 'MULTIPLE_CHOICE', 'FILL_IN_THE_BLANKS');

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "type" "QuestionType" NOT NULL;

-- AlterTable
ALTER TABLE "quizzes" DROP COLUMN "type";

-- DropEnum
DROP TYPE "QuizType";
