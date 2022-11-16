import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainAuth } from "../screens/auth";

const Auth = createNativeStackNavigator();

export default AuthStack = () => {
  return (
    <Auth.Navigator
      id="AuthStack"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 100,
        gestureEnabled: false,
      }}
    >
      <Auth.Screen name="MainAuth" component={MainAuth} />
    </Auth.Navigator>
  );
};
