import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContainerModule } from './container/container.module';
import { ExamModule } from './exam/exam.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/.${process.env.NODE_ENV}.env`
    }),
    ContainerModule,
    ExamModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


// 환경 변수 유효성 검사 (joi lib)