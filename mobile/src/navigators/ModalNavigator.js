import { createStackNavigator } from "@react-navigation/stack";
import ChatModal from "../screens/modals/Chat";
import ProfileScreen from "../screens/modals/Profile";

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
      <Modal.Screen name="ProfileScreen" component={ProfileScreen} />
      <Modal.Screen name="ChatScreen" component={ChatModal} />
    </Modal.Navigator>
  );
};
