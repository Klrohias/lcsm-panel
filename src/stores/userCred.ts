import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface UserCredentialData {
  accessToken?: string
}

export const useUserCredential = defineStore('userCredential', () => {
  const userCredentialData = ref<UserCredentialData>({})
  const isAdministrator = ref(false)
  function isAlreadySignedIn() {
    return userCredentialData.value.accessToken != void 0
  }

  return { userCredentialData, isAdministrator, isAlreadySignedIn }
}, {
  persist: true
})
