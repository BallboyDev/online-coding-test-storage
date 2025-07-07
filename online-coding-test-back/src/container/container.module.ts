import { Module } from '@nestjs/common';
import { ContainerController } from './container.controller';
import { ContainerService } from './container.service';
import { ContainerProvider } from './container.provider';

@Module({
  controllers: [ContainerController],
  providers: [ContainerService, ContainerProvider],
  exports: [ContainerService, ContainerProvider],
})
export class ContainerModule {}
