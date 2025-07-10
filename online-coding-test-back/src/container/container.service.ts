import { Inject, Injectable } from '@nestjs/common';
import * as Docker from 'dockerode';
import { Writable } from 'stream';

@Injectable()
export class ContainerService {
    constructor(
        private readonly docker: Docker
    ) { }

    async startContainer(id: string): Promise<string> {
        try {
            const container = this.docker.getContainer(id);
            await container.start();
            return `Container ${id} started successfully.`;
        } catch (err) {
            console.error(`Error starting container ${id}:`, err);
            throw new Error(`Failed to start container ${id}.`);
        }
    }

    async stopContainer(id: string): Promise<string> {
        try {
            const container = this.docker.getContainer(id);
            await container.stop();
            return `Container ${id} stopped successfully.`;
        } catch (err) {
            console.error(`Error stopping container ${id}:`, err);
            throw new Error(`Failed to stop container ${id}.`);
        }
    }

    async runContainer(image: string, fileName: string = 'test'): Promise<{ id: string, message: string }> {
        console.log('runCont >> ', image, fileName)
        let output = '';
        const outputStream = new Writable({
            write(chunk, encoding, callback) {
                output += chunk.toString();
                callback();
            },
        });

        try {
            // docker run --rm -v vol-onCoTe-storage:/exam container_js:latest [fileName | test.js]
            const options = {
                Image: image,
                Cmd: [fileName],
                HostConfig: {
                    AutoRemove: true,
                    Binds: [
                        "vol-onCoTe-storage:/exam"
                    ]
                }
            }
            const container = await this.docker.createContainer(options);

            const stream = await container.attach({
                stream: true,
                stdout: true,
                stderr: true,
            });

            container.modem.demuxStream(stream, outputStream, outputStream);

            await container.start();
            await container.wait();

            return {
                id: container.id,
                message: output
            };
        } catch (err) {
            console.error(`Error creating container from image :`, err);
            throw new Error(`Failed to create container from image .`);
        }
    }


}
