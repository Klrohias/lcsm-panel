
export interface Runner {
  id: number,
  name: string,
  endPoint: string,
  description: string,
  authToken: string
}

export interface InstanceDto {
  id: number,
  name: string,
  workingDirectory?: string,
  launchCommand?: string,
  isRunning?: boolean
}

export interface User {
  id: number,
  username: string,
  password: string
}

export interface PagedDto<T> {
  total: number,
  items: T[]
}