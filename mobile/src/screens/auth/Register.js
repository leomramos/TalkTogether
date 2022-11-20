import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import {
  CustomInput,
  CustomText,
  Row,
  ScreenContainer,
} from "../../components";
import { passwordStrengthCheck } from "../../utils/helpers";

import i18n from "../../i18n";

export default Register = ({ navigation }) => {
  const { typography, colors, screen } = useTheme();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [auxPassword, setAuxPassword] = useState("");

  const [passwordStrength, setPasswordStrength] = useState();
  const [passVis, setPassVis] = useState(false);
  const [auxPassVis, setAuxPassVis] = useState(false);

  useEffect(() => {
    setPasswordStrength(passwordStrengthCheck(password));
    !password && setAuxPassword("");
  }, [password]);

  const handleRegister = () => {};

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
          }}
          componentContainerStyle={{ justifyContent: "flex-end" }}
        >
          <CustomText
            type={typography.auth.info}
            color={colors.gray.ninth}
            style={{ marginBottom: 15 }}
          >
            {i18n.t("helloThere")}
          </CustomText>
          <CustomInput
            value={code}
            setValue={setCode}
            placeholder={i18n.t("codeSentEmail")}
            bottomSpace={3}
            keyboard="number-pad"
            maxLength={6}
          />
          <CustomInput
            value={password}
            setValue={setPassword}
            placeholder={i18n.t("password")}
            bottomSpace={3}
            maxLength={32}
            icon={passVis ? "eye-off" : "eye"}
            action={() => setPassVis(!passVis)}
            secureTextEntry={!passVis}
          />
          <CustomInput
            value={auxPassword}
            setValue={setAuxPassword}
            placeholder={i18n.t("confirmPassword")}
            editable={Boolean(password)}
            bottomSpace={3}
            maxLength={32}
            icon={auxPassVis ? "eye-off" : "eye"}
            action={() => setAuxPassVis(!auxPassVis)}
            secureTextEntry={!auxPassVis}
          />
          {password && (
            <Row style={{ marginTop: 10 }}>
              <CustomText
                type={typography.auth.forgotPassword}
                color={colors.gray.sixth}
              >
                {i18n.t("passwordStrength")}{" "}
              </CustomText>
              <CustomText
                type={typography.auth.forgotPassword}
                color={colors.password[passwordStrength]}
              >
                {i18n.t(passwordStrength)}
              </CustomText>
            </Row>
          )}
          <Button
            uppercase={false}
            contained
            color={colors.gray.ninth}
            contentStyle={{ backgroundColor: colors.purple.fifth }}
            onPress={handleRegister}
            style={{ marginVertical: 25 }}
          >
            <CustomText type={typography.auth.button} color={colors.gray.ninth}>
              Sign Up
            </CustomText>
          </Button>
        </ScrollView>
      </View>
      {/* <View></View> */}
    </ScreenContainer>
  );
};
