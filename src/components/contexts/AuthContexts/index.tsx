import axios, { AxiosError } from 'axios'
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
  HttpFetchInterface,
  HttpFetchResponseInterface,
  RefreshResponse,
  LoginResponse,
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

  const login = async (ticket: string) => {
    try {
      const response = axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
        {
          ticket,
        }
      )

      console.log(response)
    } catch (error: any) {}
  }

  useEffect(() => {
    if (searchParams.toString().includes('ticket')) {
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
