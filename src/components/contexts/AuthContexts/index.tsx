import axios from 'axios'
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  AuthContextInterface,
  AuthContextProviderProps,
  UserInterface,
} from './interface'
import { useRouter, useSearchParams } from 'next/navigation'

const AuthContext = createContext({} as AuthContextInterface) // TODO: Declare interface of contextValue

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [user, setUser] = useState<UserInterface>()
  const [isLoading, setIsLoading] = useState(false)

  const developmentLock = useRef(false)

  const login = async (ticket: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login/`,
        {
          ticket,
          service_url: 'http://localhost:3000',
        }
      )

      console.log(response.data)
    } catch (error: any) {}
  }

  useEffect(() => {
    if (
      !developmentLock.current &&
      searchParams.toString().includes('ticket')
    ) {
      developmentLock.current = true
      const ticket = searchParams.get('ticket')
      login(ticket as string)
    }
  }, [])

  const contextValue = {
    user,
    setUser,
    isLoading,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
