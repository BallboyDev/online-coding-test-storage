import * as Docker from 'dockerode';

export const ContainerProvider = {
    provide: Docker,
    useFactory: () => new Docker({ socketPath: '/var/run/docker.sock' })
}