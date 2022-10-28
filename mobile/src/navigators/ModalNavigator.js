import { createStackNavigator } from "@react-navigation/stack";
import ChatModal from "../screens/modals/Chat";
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
      <Modal.Screen name="Modal1" component={MyProfileScreen} />
      <Modal.Screen name="ChatScreen" component={ChatModal} />
    </Modal.Navigator>
  );
};
