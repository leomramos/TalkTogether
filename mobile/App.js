import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { OleoScript_700Bold } from "@expo-google-fonts/oleo-script";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import LoadingScreen from "./src/screens/Loading";

import AppStack from "./src/navigators/AppNavigator";
import Theme from "./src/utils/themes";

const queryClient = new QueryClient();

const Warning = createContext();

export default function App() {
  let [fontsLoaded] = useFonts({
    OleoScript_700Bold,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const scheme = useColorScheme();
  // add theme switch functionality

  const [warning, setWarning] = useState("");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Warning.Provider
        value={{ warning, setWarning, clearWarning: () => setWarning("") }}
      >
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={Theme.get("dark")}>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
              <SafeAreaProvider>
                <StatusBar style={scheme === "dark" ? "light" : "dark"} />
                {fontsLoaded ? (
                  <NavigationContainer>
                    <AppStack />
                  </NavigationContainer>
                ) : (
                  <LoadingScreen />
                )}
              </SafeAreaProvider>
            </IconComponentProvider>
          </PaperProvider>
        </QueryClientProvider>
      </Warning.Provider>
    </GestureHandlerRootView>
  );
}

export const useWarning = () => useContext(Warning);
