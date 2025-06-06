import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UserModule, QuizModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
