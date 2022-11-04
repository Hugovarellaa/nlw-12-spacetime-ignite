import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { createContext, ReactNode, useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession()


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
  isUserLoading: boolean
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false)
  const [user, setUser] = useState<UserProps>({} as UserProps)

  const [request, response, prompAsync] = Google.useAuthRequest({
    clientId: "610127349638-06v1l2mlqf721p4u4reeb21ec150rtp2.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', "email"]
  })



  async function signIn() {

    try {
      setIsUserLoading(true)
      await prompAsync()

    } catch (error) {
      console.log(error)

    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInGoogle(accessToken: string) {
    console.log("Token de autenticação")
    console.log(accessToken)
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider value={{
      signIn,
      user,
      isUserLoading
    }}>
      {children}
    </AuthContext.Provider>

  )

}
