import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LoginAuth,
  MainAuth,
  RecoverAuth,
  InfoAuth,
  RegisterAuth,
} from "../screens/auth";

const Auth = createNativeStackNavigator();

export default AuthStack = () => {
  return (
    <Auth.Navigator
      id="AuthStack"
      initialRouteName="MainAuth"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 100,
        gestureEnabled: false,
      }}
    >
      <Auth.Screen name="MainAuth" component={MainAuth} />
      <Auth.Screen name="LoginAuth" component={LoginAuth} />
      <Auth.Screen name="RegisterAuth" component={RegisterAuth} />
      <Auth.Screen name="InfoAuth" component={InfoAuth} />
      <Auth.Screen name="RecoverAuth" component={RecoverAuth} />
    </Auth.Navigator>
  );
};
