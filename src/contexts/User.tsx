import React, { createContext, useContext, useState } from 'react'
import { UserType } from '../types'

type UserContextType = {
    user: UserType | null;
    setUser: (user: UserType) => void;
    messages: any[];
    setMessages: (msg: []) => void;
}

const UserContext = createContext<null | UserContextType>(null)

type UserProviderProps = {
    children: React.ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<UserType | null>(null)
    const [messages, setMessages] = useState<any[]>([]);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            messages,
            setMessages,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserData = () => {
    const context = useContext(UserContext);

    if (context === null) {
        throw new Error('User context is null');
    }

    return context;
};
