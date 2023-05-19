import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { StatusBar, Text, TouchableOpacity, View } from 'react-native'

import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'

import { api } from '../src/lib/api'

import LogoNlwSpaceTimesSvg from '../src/assets/logo.svg'

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/043abf73b95ec009538d',
}

export default function App() {
  const router = useRouter()

  const [request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '043abf73b95ec009538d',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post('/sessions', {
      code,
    })

    const { token } = response.data

    await SecureStore.setItemAsync('token', token)

    router.push('/memories')
  }

  useEffect(() => {
    // console.log(
    //   'response',
    //   makeRedirectUri({
    //     scheme: 'nlwspacetime',
    //   }),
    // )

    if (response?.type === 'success') {
      const { code } = response.params

      handleGithubOAuthCode(code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View className="flex flex-1 items-center px-8 py-10">
        <View className="flex-1 items-center justify-center gap-6">
          <LogoNlwSpaceTimesSvg />

          <View className="space-y-2">
            <Text className="text-center font-title text-2xl leading-tight text-gray-50">
              Sua cápsula do tempo
            </Text>
            <Text className="text-center font-body text-base leading-relaxed text-gray-100">
              Colecione momentos marcantes da sua jornada e compartilhe (se
              quiser) com o mundo!
            </Text>
          </View>

          <TouchableOpacity
            className="rounded-full bg-green-500 px-5 py-3"
            activeOpacity={0.5}
            onPress={() => signInWithGithub()}
            disabled={!request}
          >
            <Text className="font-alt text-sm uppercase text-black">
              COMEÇAR A CADASTRAR
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
          Feito com 💜 no NLW da Rocketseat
        </Text>
      </View>
    </>
  )
}
