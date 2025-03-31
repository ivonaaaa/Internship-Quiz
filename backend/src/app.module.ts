import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [UserModule, QuizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
