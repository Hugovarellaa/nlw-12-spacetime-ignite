import { createContext, ReactNode } from "react";

interface UserProps {
  name: string
  avatarUrl: string
}
interface AuthProviderProps {
  children: ReactNode
}

export interface AuthContextProps {
  user: UserProps
  signIn: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

  const user: UserProps = {
    name: "Hugo Alves",
    avatarUrl: 'https://github.com/Hugovarellaa.png'
  }

  async function signIn() {
    console.log("vamos logar")
  }

  return (
    <AuthContext.Provider value={{
      signIn, user
    }}>
      {children}
    </AuthContext.Provider>

  )

}
