import { useEffect, useState } from 'react'
import { ChatBox, Message as MessageComponent } from '../components'
import { Container, LogoutButton } from '../styles'
import { useUserData } from '../contexts/User'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { Message as MessageType } from '../types'

export const Chat = () => {
    const [messages, setMessages] = useState<MessageType[]>([])
    const [error, setError] = useState("")
    const { user, setUser } = useUserData();
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = document.cookie.split("=")[1]
        if (!jwt) {
            return navigate("/auth")
        }
        if (!user) {
            api.getUser().then(res => {
                setUser(res)
            })
            return
        }
        api.getMessages().then(res => {
            if(!res || !res.length)
                return setMessages([])
            setMessages(res.map((el: MessageType)=>({
                message: el.message,
                date: new Date(el.date).getTime(),
                isUserMessage: el.isUserMessage,
            })))
        }).catch(error => {
            setError(error.error)
        })
    }, [user])

    const addNewMessage = (message: string) => {
        setMessages(prev => [...prev, {
            message: message,
            date: new Date().getTime(),
            isUserMessage: true,
        }])
        api.sendMessage(message).then(res => {
            setMessages(prev => [...prev, {
                message: res.message,
                date: new Date().getTime(),
                isUserMessage: false,
            }])
        })
    }

    const logout = ()=>{
        document.cookie = `c317-jwt=123; expires= ${new Date(new Date().getTime() + 1).toUTCString()}; path=/;`
        setTimeout(()=>{
            location.reload()
        }, 100)
    }

    return (
        <Container key={messages.length}>
            <LogoutButton onClick={logout}>Sair</LogoutButton>
            {error ? <h1>{error}</h1> : null}
            {
                messages.length ? (
                    <>
                        {messages.sort((a, b) => a.date - b.date).map((msg, index) => (
                            <MessageComponent message={msg} key={index}></MessageComponent>
                        ))}
                    </>
                ) : null
            }
            <ChatBox sendFunction={addNewMessage}></ChatBox>
        </Container>
    )
}
