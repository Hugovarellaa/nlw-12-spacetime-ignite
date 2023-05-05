import { ActivityIndicator, View } from 'react-native'

export function Loading() {
  return (
    <View className="flex flex-1">
      <ActivityIndicator size="large" color="#04d361" />
    </View>
  )
}
