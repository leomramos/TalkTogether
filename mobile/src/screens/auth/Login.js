import { API_URL } from "@env";
import axios from "axios";
import React, { useState } from "react";
import { Keyboard, ScrollView, View } from "react-native";
import { Button, TouchableRipple, useTheme } from "react-native-paper";
import { useUser, useWarning } from "../../../App";
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

  const { setWarning } = useWarning();
  const { user, setUser } = useUser();

  const [password, setPassword] = useState("");

  const [passVis, setPassVis] = useState(false);

  const continueLogin = user => {
    console.log(user);
    setUser(user);
    navigation.replace("Tabs");
  };

  const checkLogin = () => {
    axios
      .post(`${API_URL}/auth/login`, {
        ...user,
        password,
      })
      .then(res => {
        res.data
          ? continueLogin(res.data)
          : setWarning(i18n.t("incorrectPasswordError"));
      })
      .catch(e => {
        throw e;
      });
  };

  const handleLogin = () => {
    Keyboard.dismiss();

    checkLogin();
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
              {i18n.t("welcomeBack", { user: "User" })}
            </CustomText>
          </Row>
          <CustomInput
            value={password}
            setValue={setPassword}
            placeholder={i18n.t("password")}
            maxLength={32}
            icon={passVis ? "eye-off" : "eye"}
            action={() => setPassVis(!passVis)}
            secureTextEntry={!passVis}
            textContentType="password"
            restriction={text => !text.includes(" ")}
            autoCapitalize="none"
          />
          {/* <View style={{ alignItems: "flex-end" }}>
            <TouchableRipple
              onPress={() => navigation.navigate("RecoverAuth")}
              style={{ paddingVertical: 3, paddingHorizontal: 5, marginTop: 2 }}
            >
              <CustomText
                type={typography.auth.forgotPassword}
                color={colors.gray.sixth}
              >
                {i18n.t("forgotPassword", { user: "User" })}
              </CustomText>
            </TouchableRipple>
          </View> */}
          <Button
            uppercase={false}
            contained
            disabled={!password}
            color={colors.gray.ninth}
            contentStyle={{
              backgroundColor: colors.purple.fifth,
              opacity: !password ? 0.4 : 1,
            }}
            onPress={handleLogin}
            style={{ marginTop: 17 }}
          >
            <CustomText
              type={typography.auth.button}
              color={colors.gray.ninth}
              style={{ textTransform: "capitalize" }}
            >
              {i18n.t("signIn")}
            </CustomText>
          </Button>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};
