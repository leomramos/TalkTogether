import {
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppStack from "./src/navigators/AppNavigator";
import Theme from "./src/utils/themes";

import i18n from "./src/i18n";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_500Medium,
  });

  const scheme = useColorScheme();
  // add theme switch functionality
  return (
    <PaperProvider theme={Theme.get("dark")}>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <SafeAreaProvider>
          <StatusBar style="light" />
          {/* <StatusBar style={scheme === "dark" ? "light" : "dark"} /> */}
          {fontsLoaded && (
            <NavigationContainer>
              <AppStack />
            </NavigationContainer>
          )}
        </SafeAreaProvider>
      </IconComponentProvider>
    </PaperProvider>
  );
}
