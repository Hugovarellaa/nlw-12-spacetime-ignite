import { BaiJamjuree_700Bold, useFonts } from '@expo-google-fonts/bai-jamjuree'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { SplashScreen, Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { styled } from 'nativewind'
import { useEffect, useState } from 'react'
import { ImageBackground, StatusBar } from 'react-native'
import blurBackground from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripe.svg'
const StyledStripes = styled(Stripes) // Usando nativewind em tags nao suportada

export default function Layout() {
  const [isUserAuthenticate, setIsUserAuthenticate] = useState<null | boolean>(
    null,
  )

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsUserAuthenticate(!!token)
    })
  }, [])

  if (!fontsLoaded) {
    return <SplashScreen />
  }

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ImageBackground
        source={blurBackground}
        imageStyle={{ position: 'absolute', left: '-100%' }}
        className="relative flex flex-1 bg-gray-900"
      >
        <StyledStripes className="absolute left-2" />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="index" redirect={isUserAuthenticate} />
          <Stack.Screen name="new" />
          <Stack.Screen name="memories" />
        </Stack>
      </ImageBackground>
    </>
  )
}
