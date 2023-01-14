import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CallModal,
  ChatModal,
  CorrectionModal,
  LanguagesModal,
  ProfileModal,
} from "../screens/modals/";

const Modal = createNativeStackNavigator();

export default ModalStack = () => {
  return (
    <Modal.Navigator
      id="ModalStack"
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
        animationDuration: 100,
        gestureDirection: "vertical",
      }}
    >
      <Modal.Screen
        name="CallModal"
        component={CallModal}
        options={{
          animation: "slide_from_bottom",
        }}
      />
      <Modal.Screen name="ChatModal" component={ChatModal} />
      <Modal.Screen
        name="CorrectionModal"
        component={CorrectionModal}
        options={{ presentation: "containedModal" }}
      />
      <Modal.Screen name="ProfileModal" component={ProfileModal} />
      <Modal.Screen
        name="LanguagesModal"
        component={LanguagesModal}
        options={{ presentation: "containedModal" }}
      />
    </Modal.Navigator>
  );
};
