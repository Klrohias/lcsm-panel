import httpClient, { setTokens } from './api-http-client';

export interface Runner {
    id: number,
    socketUri: string,
    description: string
}

export async function signIn(username: string, password: string) {
    let resp = await httpClient.post('/User/Authenticate', { username, password })
    setTokens(resp.data['accessToken'])
}

export async function listRunners() {
    let resp = await httpClient.get('/Runners')

    return resp.data as Runner[]
}