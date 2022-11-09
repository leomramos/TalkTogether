import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CallModal from "../screens/modals/Call";
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
      <Modal.Screen
        name="CallModal"
        component={CallModal}
        options={{ animation: "slide_from_bottom" }}
      />
      <Modal.Screen name="ChatScreen" component={ChatModal} />
      <Modal.Screen name="ProfileScreen" component={ProfileScreen} />
    </Modal.Navigator>
  );
};
