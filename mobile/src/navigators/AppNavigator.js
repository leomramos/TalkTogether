import { createStackNavigator } from "@react-navigation/stack";
import ModalNavigator from "./ModalNavigator";
import TabNavigator from "./TabNavigator";

const App = createStackNavigator();

export default AppStack = () => {
  return (
    <App.Navigator
      id="AppStack"
      initialRouteName="Tabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <App.Screen name="Tabs" component={TabNavigator} />
      <App.Screen
        name="Modals"
        component={ModalNavigator}
        options={{ presentation: "modal" }}
      />
    </App.Navigator>
  );
};
