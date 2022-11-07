import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatModal from "../screens/modals/Chat";
import ProfileScreen from "../screens/modals/Profile";

const Modal = createNativeStackNavigator();

export default ModalStack = () => {
  return (
    <Modal.Navigator
      id="ModalStack"
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
        animationDuration: 100,
      }}
    >
      <Modal.Screen name="ProfileScreen" component={ProfileScreen} />
      <Modal.Screen name="ChatScreen" component={ChatModal} />
    </Modal.Navigator>
  );
};
