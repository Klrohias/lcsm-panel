import httpClient from './httpClient'
import type { Instance } from './types'

export async function listInstances(runnerId: number) {
    let resp = await httpClient.get(`/Instances/${runnerId}`)
    return resp.data as Instance[]
}