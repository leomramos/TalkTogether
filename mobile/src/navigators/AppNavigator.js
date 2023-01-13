import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Snackbar, useTheme } from "react-native-paper";
import { useUser, useWarning } from "../../App";
import LoadingScreen from "../screens/Loading";
import AuthNavigator from "./AuthNavigator";
import ModalNavigator from "./ModalNavigator";
import TabNavigator from "./TabNavigator";

const App = createNativeStackNavigator();

export default AppStack = () => {
  const { warning, clearWarning } = useWarning();
  const { colors } = useTheme();
  const { user } = useUser();

  return (
    <>
      <App.Navigator
        id="AppStack"
        initialRouteName={user?._id ? "Tabs" : "Auth"}
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
          animationDuration: 100,
        }}
      >
        <App.Screen
          name="Modals"
          component={ModalNavigator}
          options={{
            presentation: "fullScreenModal",
          }}
        />
        <App.Screen name="Tabs" component={TabNavigator} />
        <App.Screen name="Auth" component={AuthNavigator} />
        <App.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ animation: "none" }}
        />
      </App.Navigator>
      <Snackbar
        visible={warning}
        onDismiss={clearWarning}
        action={{
          label: "✖",
        }}
        style={{
          backgroundColor: colors.gray.first,
        }}
        theme={{ colors: { accent: colors.aux.cancel } }}
      >
        {warning}
      </Snackbar>
    </>
  );
};
