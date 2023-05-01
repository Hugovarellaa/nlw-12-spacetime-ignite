import { StatusBar, Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex flex-1 items-center justify-center bg-gray-900">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Text className="text-gray-50">
        Open up App.js to start working on your app!
      </Text>
    </View>
  );
}
