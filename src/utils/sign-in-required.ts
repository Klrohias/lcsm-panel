import httpClient from "./api-http-client"
import { router } from "@/router"

(async () => {
    try {
        await httpClient.get('/User')
    } catch (e: any) {
        if (e.status == 401) {
            router.replace('/signIn')
        }
    }
})()