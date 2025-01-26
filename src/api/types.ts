
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

export interface User {
  id: number,
  username: string,
  password: string
}