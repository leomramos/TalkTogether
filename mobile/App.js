import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppStack from "./src/navigators/AppNavigator";
import Theme from "./src/utils/themes";

import i18n from "./src/i18n";

export default function App() {
  // add theme switch functionality
  return (
    <PaperProvider theme={Theme.get("dark")}>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppStack />
            <StatusBar color="black" />
          </NavigationContainer>
        </SafeAreaProvider>
      </IconComponentProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
