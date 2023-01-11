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

import { API_URL } from "@env";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
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

const User = createContext();
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
  const [user, setUser] = useState({});

  console.log(user);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <User.Provider value={{ user, setUser }}>
        <Warning.Provider
          value={{ warning, setWarning, clearWarning: () => setWarning("") }}
        >
          <QueryClientProvider client={queryClient}>
            <PaperProvider theme={Theme.get("dark")}>
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <SafeAreaProvider>
                  <StatusBar style={scheme === "dark" ? "light" : "dark"} />
                  {fontsLoaded || user?.isLoading ? (
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
      </User.Provider>
    </GestureHandlerRootView>
  );
}

export const useUser = () => useContext(User);
export const useWarning = () => useContext(Warning);
