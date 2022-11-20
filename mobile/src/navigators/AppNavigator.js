import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "../screens/Loading";
import AuthNavigator from "./AuthNavigator";
import ModalNavigator from "./ModalNavigator";
import TabNavigator from "./TabNavigator";

const App = createNativeStackNavigator();

export default AppStack = () => {
  return (
    <App.Navigator
      id="AppStack"
      initialRouteName="Auth"
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
  );
};
