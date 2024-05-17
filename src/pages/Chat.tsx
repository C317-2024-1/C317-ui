import { useEffect, useState } from 'react'
import { ChatBox, Message as MessageComponent } from '../components'
import { Container } from '../styles'
import { useUserData } from '../contexts/User'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { Message as MessageType } from '../types'

export const Chat = () => {
    const [messages, setMessages] = useState<MessageType[]>([])
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
            setMessages(res)
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

    return (
        <Container key={messages.length}>
            {messages.sort((a, b) => a.date - b.date).map((msg, index) => (
                <MessageComponent message={msg} key={index}></MessageComponent>
            ))}
            <ChatBox sendFunction={addNewMessage}></ChatBox>
        </Container>
    )
}
