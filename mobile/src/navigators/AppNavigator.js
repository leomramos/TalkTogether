import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModalNavigator from "./ModalNavigator";
import TabNavigator from "./TabNavigator";

const App = createNativeStackNavigator();

export default AppStack = () => {
  return (
    <App.Navigator
      id="AppStack"
      initialRouteName="Tabs"
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
        animationDuration: 100,
      }}
    >
      <App.Screen
        name="Modals"
        component={ModalNavigator}
        options={{ presentation: "fullScreenModal" }}
      />
      <App.Screen name="Tabs" component={TabNavigator} />
    </App.Navigator>
  );
};
