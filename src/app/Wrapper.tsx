"use client"
import { SessionProvider } from 'next-auth/react'

export const Wrapper = ({ children } : { children: React.ReactNode }) => {
    return (
        <SessionProvider
           refetchInterval={60000}
           refetchOnWindowFocus
        >            
            {children}
        </SessionProvider>
    )
}