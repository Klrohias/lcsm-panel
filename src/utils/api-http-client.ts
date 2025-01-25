import axios from "axios";

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN'

const client = axios.create({
    baseURL: import.meta.env.VITE_API_ROOT,
})

client.interceptors.response.use(
    res => res,
    res => {
        if (res.status == 401) { // FIX axios cannot catch 401
            throw res
        }
    }
);

export default client

function resetHeaders() {
    let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
    if (accessToken) {
        client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    }
}

export function setTokens(accessToken: string) {
    if (accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    }
    resetHeaders()
}

resetHeaders()