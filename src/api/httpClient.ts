import { useUserCredential } from "@/stores/userCred";
import axios from "axios"

const client = axios.create({
  baseURL: import.meta.env.VITE_API_ROOT,
})

client.interceptors.request.use(
  req => {
    if (!req.headers.Authorization) {
      updateHeaders([client.defaults.headers.common, req.headers])
    }

    return req
  },
  req => req,
)

export default client

function updateHeaders(operatedHeaders: any[]) {
  const userCred = useUserCredential()
  const headers: any = {};

  if (userCred.isAlreadySignedIn()) {
    headers.Authorization = `Bearer ${userCred.userCredentialData.accessToken}`
  }

  operatedHeaders.forEach(x => Object.assign(x, headers))
}

export function setAccessToken(accessToken: string) {
  if (accessToken) {
    const userCred = useUserCredential()
    userCred.userCredentialData.accessToken = accessToken
  }

  updateHeaders([client.defaults.headers.common])
}
