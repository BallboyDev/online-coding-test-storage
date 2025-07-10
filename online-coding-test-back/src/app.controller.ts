import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly config: ConfigService
  ) { }

  @Get()
  getHello(): string {

    console.log(process.env.NODE_ENV)
    console.log(this.config.get('PORT'))
    console.log(this.config.get('STORAGE_HOST'))
    console.log(this.config.get('STORAGE_PORT'))

    return this.appService.getHello();
  }
}
