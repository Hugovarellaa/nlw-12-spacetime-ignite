import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import { NativeBaseProvider, StatusBar } from "native-base";
import { Loading } from "./src/components/Loading";
import { AuthProvider } from "./src/context/AuthContext";
import { New } from "./src/screens/New";
import { THEME } from './src/styles/theme';


export default function App() {
  const [fontsLoading] = useFonts({
    Roboto_400Regular, Roboto_500Medium, Roboto_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {
          fontsLoading ? <New /> : <Loading />
        }
      </AuthProvider>
    </NativeBaseProvider>
  );
}
