import React, { useEffect, useState } from 'react'
import { AuthContainer, LoginButton, SignUpButton, Input } from '../styles'
import api from "../api"
import { useNavigate } from 'react-router-dom'
import { useUserData } from '../contexts/User'

export const Auth = () => {
    const [signUpState, setSignUpState] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const { setUser } = useUserData();
    const navigate = useNavigate()

    const updateValues = (field: "name" | "email" | "password", newValue: string) => {
        switch (field) {
            case "name":
                return setName(newValue)
            case "email":
                return setEmail(newValue)
            case "password":
                return setPassword(newValue)
        }
    }

    const clearFields = () => {
        setName("")
        setEmail("")
        setPassword("")
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        !signUpState ? signIn() : signUp()
    }

    const signIn = () => {
        api.signIn({ email, password }).then((res: {"c317-jwt": string}) => {
            setUser({name, email})
            document.cookie = `c317-jwt=${res["c317-jwt"]}; expires= ${new Date(new Date().getTime() + 1*60*60*1000).toUTCString()}; path=/;`
            navigate("/")
        }).catch(error => {
            console.error(error);
            clearFields()
            setError(true)
        })
    }

    const signUp = () => {
        api.signUp({ name, email, password }).then(res => {
            signIn()
        }).catch(error => {
            console.error(error);
            clearFields()
            setError(true)
        })
    }

    useEffect(() => {
        clearFields()
    }, [signUpState])

    return (
        <AuthContainer onSubmit={submit}>
            {signUpState &&
                <Input value={name} onChange={(e) => updateValues("name", e.target.value)} placeholder='Enter your name...'></Input>}
            <Input value={email} onChange={(e) => updateValues("email", e.target.value)} placeholder='Enter your email...'></Input>
            <Input value={password} onChange={(e) => updateValues("password", e.target.value)} placeholder='Enter your password...' type="password"></Input>
            <LoginButton type="submit" >{!signUpState ? "Entrar" : "Cadastre-se"}</LoginButton>
            <SignUpButton type="button" onClick={() => setSignUpState(prev => !prev)}>{!signUpState ? "Criar nova conta" : "Entrar com conta existente"}</SignUpButton>
            {error && <p style={{ color: "red" }}>Ocorreu um erro, por favor verifique o console</p>}
        </AuthContainer>
    )
}
