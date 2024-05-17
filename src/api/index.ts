import { Message } from "../types"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const signIn = async ({ email, password }: { email: string, password: string }) => {
    const response = await fetch(`${BACKEND_URL}/api/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    return response.json()
}


const signUp = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    const response = await fetch(`${BACKEND_URL}/api/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    return response.json()
}

const getUser = async () => {
    const response = await fetch(`${BACKEND_URL}/api/user/`, {
        credentials: 'include',
    })
    return response.json()
}

const getMessages = async () => {
    const response = await fetch(`${BACKEND_URL}/api/user/messages/`, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'GET',
    })
    return response.json()
}


const sendMessage = async (message: string) => {
    const response = await fetch(`${BACKEND_URL}/api/message/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message })
    })
    return response.json()
}


const api = {
    signIn,
    signUp,
    getUser,
    getMessages,
    sendMessage,
}

export default api