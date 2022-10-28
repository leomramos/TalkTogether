import React from "react";
import { ChatHeader } from "../../components";
import ScreenContainer from "../../components/ScreenContainer";
import i18n from "../../i18n";

export default Chat = ({ route, navigation }) => {
  return (
    <ScreenContainer>
      <ChatHeader user={route.params.user} goBack={() => navigation.goBack()} />
    </ScreenContainer>
  );
};
