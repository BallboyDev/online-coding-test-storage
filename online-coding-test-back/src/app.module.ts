import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContainerModule } from './container/container.module';
import { ExamModule } from './exam/exam.module';

@Module({
  imports: [ContainerModule, ExamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
