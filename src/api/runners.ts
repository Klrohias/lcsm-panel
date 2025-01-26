import type { JsonPatchDocument } from '@/utils/jsonPatch'
import httpClient from './httpClient'
import type { Runner } from './types'

export async function listRunners() {
    let resp = await httpClient.get('/Runners')
    return resp.data as Runner[]
}

export async function createRunner(runner: Runner) {
    await httpClient.put(`/Runners`, runner)
}

export async function updateRunner(runnerId: number, patch: JsonPatchDocument) {
    await httpClient.post(`/Runners/${runnerId}`, patch)
}

export async function deleteRunner(runnerId: number) {
    await httpClient.delete(`/Runners/${runnerId}`)
}
