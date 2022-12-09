import Constants from "expo-constants";
import React, { useState } from "react";
import { Keyboard, ScrollView, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { Button, TouchableRipple, useTheme } from "react-native-paper";
import {
  CustomInput,
  CustomText,
  NavigateBack,
  Row,
  ScreenContainer,
} from "../../components";

import i18n from "../../i18n";

export default Login = ({ navigation }) => {
  const { typography, colors, screen } = useTheme();

  const [password, setPassword] = useState("");
  const [date, setDate] = useState(new Date());

  const [passVis, setPassVis] = useState(false);

  const handleLogin = () => {
    Keyboard.dismiss();
    navigation.navigate("Tabs");
  };

  return (
    <ScreenContainer>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingRight: screen.padding.left + 10,
          paddingLeft: 10,
          paddingTop: 35,
          overflow: "hidden",
        }}
      >
        <ScrollView
          style={{
            width: "100%",
          }}
          componentContainerStyle={{ justifyContent: "flex-end" }}
        >
          <Row style={{ marginBottom: 15 }}>
            <NavigateBack action={navigation.goBack} marginLeft={0} />
            <CustomText type={typography.auth.info} color={colors.gray.ninth}>
              {i18n.t("fillYourInformation", { user: "User" })}
            </CustomText>
          </Row>

          {Constants.appOwnership !== "expo" && (
            <DatePicker
              mode="date"
              date={date}
              minimumDate={new Date("1900-01-02")}
              maximumDate={new Date()}
              onDateChange={setDate}
              androidVariant="iosClone"
              textColor="#ffffff"
              fadeToColor="none"
            />
          )}

          <Button
            uppercase={false}
            contained
            color={colors.gray.ninth}
            contentStyle={{ backgroundColor: colors.purple.fifth }}
            onPress={handleLogin}
            style={{ marginTop: 17 }}
          >
            <CustomText
              type={typography.auth.button}
              color={colors.gray.ninth}
              style={{ textTransform: "capitalize" }}
            >
              {i18n.t("signUp")}
            </CustomText>
          </Button>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};
