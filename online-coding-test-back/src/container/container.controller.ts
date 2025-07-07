import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContainerService } from './container.service';

@Controller('container')
export class ContainerController {
    constructor(private readonly service: ContainerService) { }

    @Get()
    getContainer(): string {
        return 'getContainer'
    }

    // start container
    // curl 127.0.0.1:3000/container/start -X POST -H "Content-Type: application/json" -d '{"id": "1234"}'
    @Post('start')
    async startContainer(@Body('id') id: string): Promise<string> {
        return await this.service.startContainer(id)
    }

    // stop container
    // curl 127.0.0.1:3000/container/stop -X POST -H "Content-Type: application/json" -d '{"id": "1234"}'
    @Post('stop')
    async stopContainer(@Body('id') id: string): Promise<string> {
        return await this.service.stopContainer(id)
    }

    // run container
    // curl -X POST  127.0.0.1:3000/container/run -H "Content-Type: application/json" -d '{"image": "container_js:latest", "fileName": "test.js"}'
    @Post('run')
    async runContainer(@Body() body: { image: string, fileName: string }): Promise<{ id: string, message: string }> {

        const { image, fileName } = body

        return await this.service.runContainer(image, fileName)
    }
}
