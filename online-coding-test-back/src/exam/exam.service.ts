import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExamService {
    constructor(
        private readonly config: ConfigService,
        private readonly httpService: HttpService
    ) { }

    async submit(lang: string, code: string): Promise<{ id: string | null, fileName: string | null, ext: string | null, msg: string }> {
        const extensions: { [key: string]: string } = {
            'c': 'c',
            'c++': 'cpp',
            'java': 'java',
            'javascript': 'js',
            'python': 'py',
            'sql': 'sql',
        };

        const fileExtension = extensions[lang.toLowerCase()] || 'txt'; // Default to .txt if lang is not recognized
        const filename = `test.${fileExtension}`;
        const formData = new FormData();
        formData.append('file', new Blob([code], { type: 'text/plain' }), filename);

        try {

            const storageHost = this.config.get<string>('STORAGE_HOST')
            const storagePort = this.config.get<string>('STORAGE_PORT')

            const res = await firstValueFrom(this.httpService.post(`http://${storageHost}:${storagePort}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }));
            const { id, fileName, ext } = res.data
            return {
                id: id,
                fileName: fileName,
                ext: ext,
                msg: 'upload Success'
            }
        } catch (error) {
            console.error(error)
            return { id: null, fileName: null, ext: null, msg: error }
        }
    }
}
