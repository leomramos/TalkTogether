import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CallModal, ChatModal, ProfileModal } from "../screens/modals/";

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
        options={{
          animation: "slide_from_bottom",
          gestureDirection: "vertical",
        }}
      />
      <Modal.Screen name="ChatModal" component={ChatModal} />
      <Modal.Screen
        name="ProfileModal"
        component={ProfileModal}
        options={{ gestureDirection: "vertical" }}
      />
    </Modal.Navigator>
  );
};
