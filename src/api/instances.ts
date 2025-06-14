import httpClient from './httpClient'
import type { InstanceDto, PagedDto } from './types'

export async function listInstances(runnerId: number) {
    let resp = await httpClient.get(`/Instances/${runnerId}`)
    return resp.data as PagedDto<InstanceDto>
}

export async function startInstance(runnerId: number, instanceId: number) {
    await httpClient.put(`/Instances/${runnerId}/${instanceId}/RunningProcess`)
}

export async function terminateInstance(runnerId: number, instanceId: number) {
    await httpClient.delete(`/Instances/${runnerId}/${instanceId}/RunningProcess`)
}