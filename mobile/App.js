import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import AppTheme from "./src/utils/themes";

import i18n from "./src/i18n";

export default function App() {
  // add theme switch functionality
  return (
    <PaperProvider theme={AppTheme.get("dark")}>
      <View style={styles.container}>
        <Text>{i18n.t("greeting")}</Text>
        <StatusBar style="auto" />
      </View>
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
