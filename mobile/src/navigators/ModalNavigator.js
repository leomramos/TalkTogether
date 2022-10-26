import { createStackNavigator } from "@react-navigation/stack";
import CallsScreen from "../screens/tabs/Calls";
import MyProfileScreen from "../screens/tabs/MyProfile";

const Modal = createStackNavigator();

export default ModalStack = () => {
  return (
    <Modal.Navigator
      id="ModalStack"
      backBehavior="history"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Modal.Screen name="ChatScreen" component={MyProfileScreen} />
      <Modal.Screen name="CallsScreen" component={CallsScreen} />
    </Modal.Navigator>
  );
};
