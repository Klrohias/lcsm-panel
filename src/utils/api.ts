import httpClient, { setTokens } from './api-http-client';

export interface Runner {
    id: number,
    name: string,
    socketUri: string,
    description: string,
    socketType: SocketType
}

export enum SocketType {
    Builtin = 0,
    WebSocket = 1
}
export interface Instance {
    id: number,
    name: string,
    workingDirectory: string,
    launchCommand: string
}

export async function signIn(username: string, password: string) {
    let resp = await httpClient.post('/User/Authenticate', { username, password })
    setTokens(resp.data['accessToken'])
}

export async function listRunners() {
    let resp = await httpClient.get('/Runners')
    return resp.data as Runner[]
}

export async function createRunner(runner: Runner) {
    await httpClient.put(`/Runners`, runner)
}

export async function updateRunner(runner: Runner) {
    await httpClient.post(`/Runners/${runner.id}`, runner)
}

export async function deleteRunner(runner: Runner) {
    await httpClient.delete(`/Runners/${runner.id}`)
}

export async function listInstances(runnerId: number) {
    let resp = await httpClient.get(`/Instances/${runnerId}`)
    return resp.data as Instance[]
}