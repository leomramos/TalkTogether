import React from "react";
import { Text, View } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import i18n from "../../i18n";

export default Calls = () => {
  return (
    <ScreenContainer>
      <PageHeader title={i18n.t("calls")} />
    </ScreenContainer>
  );
};
