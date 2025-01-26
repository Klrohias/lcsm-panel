import httpClient from "@/api/httpClient"
import { router } from "@/router"
import { useUserCredential } from "@/stores/userCred"

export async function signInRequired() {
  const userCred = useUserCredential()
  if (!userCred.isAlreadySignedIn()) {
    router.replace('/signIn')
    return
  }

  try {
    let resp = await httpClient.get('/User')
    userCred.isAdministrator = resp.data['isAdministrator']
  } catch (e: any) {
    if (e.status == 401) {
      router.replace('/signIn')
    }
  }
}