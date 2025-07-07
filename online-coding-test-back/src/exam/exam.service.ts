import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExamService {
    constructor(private readonly httpService: HttpService) { }

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
            const uploadUrl = 'http://127.0.0.1:3100/upload'
            // const uploadUrl = 'http://oncote-storage:3100/upload'
            const res = await firstValueFrom(this.httpService.post(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }));
            console.log(res.data)
            const { id, fileName, ext } = res.data
            return {
                id: id,
                fileName: fileName,
                ext: ext,
                msg: 'upload Success'
            }
        } catch (error) {
            console.log(error)
            return { id: null, fileName: null, ext: null, msg: error }
        }
    }
}
