import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import {
  CustomInput,
  CustomText,
  Row,
  ScreenContainer,
} from "../../components";
import { passwordStrengthCheck } from "../../utils/helpers";

import i18n from "../../i18n";

export default Recover = ({ navigation }) => {
  const { typography, colors, screen } = useTheme();

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [auxPassword, setAuxPassword] = useState("");

  const [passwordStrength, setPasswordStrength] = useState();
  const [passVis, setPassVis] = useState(false);
  const [auxPassVis, setAuxPassVis] = useState(false);

  useEffect(() => {
    setPasswordStrength(passwordStrengthCheck(newPassword));
    !newPassword && setAuxPassword("");
  }, [newPassword]);

  const handleRecover = () => {
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
              {i18n.t("createNewPassword")}
            </CustomText>
          </Row>
          <CustomInput
            value={code}
            setValue={setCode}
            placeholder={i18n.t("codeSentEmail")}
            bottomSpace={3}
            keyboard="number-pad"
            maxLength={6}
          />
          <CustomInput
            value={newPassword}
            setValue={setNewPassword}
            placeholder={i18n.t("newPassword")}
            bottomSpace={3}
            maxLength={32}
            icon={passVis ? "eye-off" : "eye"}
            action={() => setPassVis(!passVis)}
            secureTextEntry={!passVis}
            textContentType="password"
            restriction={text => !text.includes(" ")}
          />
          <CustomInput
            value={auxPassword}
            setValue={setAuxPassword}
            placeholder={i18n.t("confirmPassword")}
            editable={Boolean(newPassword)}
            bottomSpace={3}
            maxLength={32}
            icon={auxPassVis ? "eye-off" : "eye"}
            action={() => setAuxPassVis(!auxPassVis)}
            secureTextEntry={!auxPassVis}
            textContentType="password"
            restriction={text => !text.includes(" ")}
          />
          {newPassword && (
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
            onPress={handleRecover}
            style={{ marginTop: 25 }}
          >
            <CustomText
              type={typography.auth.button}
              color={colors.gray.ninth}
              style={{ textTransform: "capitalize" }}
            >
              {i18n.t("resetPassword")}
            </CustomText>
          </Button>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};
