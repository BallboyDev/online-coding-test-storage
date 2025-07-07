import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { HttpModule } from '@nestjs/axios';
import { ContainerModule } from '../container/container.module';

@Module({
  imports: [HttpModule, ContainerModule],
  controllers: [ExamController],
  providers: [ExamService]
})
export class ExamModule {}
