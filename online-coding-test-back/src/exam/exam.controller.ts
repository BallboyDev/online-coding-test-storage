import { Body, Controller, Post, Get } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ContainerService } from '../container/container.service';

@Controller('exam')
export class ExamController {
    constructor(
        private readonly examService: ExamService,
        private readonly containerService: ContainerService
    ) { }

    @Get('')
    async exam(): Promise<string> {
        return 'exam controller'
    }

    // curl -X POST -H "Content-Type: application/json" -d '{"lang": "javascript", "code": "console.log(\"test\")"}' 127.0.0.1:3000/exam/submit
    @Post("submit")
    async submit(@Body() body: { lang: string, code: string }): Promise<{ id: string | null, fileName: string | null, msg: string }> {
        const saveResult = await this.examService.submit(body.lang, body.code);

        const { id, fileName, ext, msg } = saveResult

        console.log(id, fileName, ext, msg)

        // const executeResult = await this.containerService.runContainer(`container_${ext}:latest`, fileName || 'test.js')

        // console.log(executeResult)

        // return { id: id, fileName: fileName, msg: executeResult?.message || 'test' }
        return { id: id, fileName: fileName, msg: 'test' }
    }
}
