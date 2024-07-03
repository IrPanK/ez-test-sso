import { HttpStatusCode } from 'axios'
import { ReactNode } from 'react'

export interface AuthContextProviderProps {
  children: ReactNode
}

export interface UserInterface {
  id?: string
  name?: string
  npm?: string
  class?: string
  major?: string
  isVoted?: boolean
}

export interface HttpFetchInterface {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  isAuthorized?: boolean
  body?: any
}

export interface HttpFetchResponseInterface<T> {
  hasError: boolean
  data?: T
}

export interface AuthContextInterface {
  user: UserInterface | undefined
  setUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>
  isLoading: boolean
}

export interface RefreshResponse {
  code: HttpStatusCode
  success: boolean
  content: {
    accessToken: string
    user: UserInterface
  }
  message: string
}

export interface LoginResponse {
  code: HttpStatusCode
  success: boolean
  content: {
    accessToken: string
    user: UserInterface
  }
  message: string
}
