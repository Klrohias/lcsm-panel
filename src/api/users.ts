import httpClient, { setAccessToken } from './httpClient'
import type { User } from './types'

export async function signIn(username: string, password: string) {
  let resp = await httpClient.post('/User/Authenticate', { username, password })
  setAccessToken(resp.data['accessToken'])
}

export async function createUser(user: User) {
  await httpClient.put('/User', user)
}
