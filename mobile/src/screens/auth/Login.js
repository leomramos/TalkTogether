import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import {
  CustomInput,
  CustomText,
  NavigateBack,
  ScreenContainer,
} from "../../components";

import i18n from "../../i18n";

export default Login = ({ navigation }) => {
  const { typography, colors, screen } = useTheme();

  const [password, setPassword] = useState("");

  const [passVis, setPassVis] = useState(false);

  const handleLogin = () => {};

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
        <NavigateBack action={navigation.goBack} />
        <ScrollView
          style={{
            width: "100%",
            gap: 1,
          }}
          componentContainerStyle={{ justifyContent: "flex-end" }}
        >
          <CustomText
            type={typography.auth.info}
            color={colors.gray.ninth}
            style={{ marginBottom: 15 }}
          >
            {i18n.t("welcomeBack", { user: "User" })}
          </CustomText>
          <CustomInput
            value={password}
            setValue={setPassword}
            placeholder={i18n.t("password")}
            maxLength={32}
            icon={passVis ? "eye-off" : "eye"}
            action={() => setPassVis(!passVis)}
            secureTextEntry={!passVis}
          />
          <View style={{ alignItems: "flex-end" }}>
            <CustomText
              type={typography.auth.forgotPassword}
              color={colors.gray.sixth}
              style={{ marginTop: 5 }}
            >
              {i18n.t("forgotPassword", { user: "User" })}
            </CustomText>
          </View>
          <Button
            uppercase={false}
            contained
            color={colors.gray.ninth}
            contentStyle={{ backgroundColor: colors.purple.fifth }}
            onPress={handleLogin}
            style={{ marginVertical: 20 }}
          >
            <CustomText type={typography.auth.button} color={colors.gray.ninth}>
              Sign In
            </CustomText>
          </Button>
        </ScrollView>
      </View>
      {/* <View></View> */}
    </ScreenContainer>
  );
};
