import React, { useState } from "react";
import { Image, Keyboard, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { CustomInput, CustomText, ScreenContainer } from "../../components/";

import i18n from "../../i18n";

export default Main = ({ navigation }) => {
  const { typography, colors, screen } = useTheme();

  const [email, setEmail] = useState("");

  const handleContinue = () => {
    Keyboard.dismiss();
    email
      ? navigation.navigate("LoginAuth")
      : navigation.navigate("RegisterAuth");
  };

  const logo = require("../../../assets/logo.png");

  return (
    <ScreenContainer>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingRight: screen.padding.left + 10,
          paddingLeft: 10,
          paddingTop: 60,
          // overflow: "hidden",
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "flex-end" }}>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 25,
              alignItems: "center",
            }}
          >
            <Image
              source={logo}
              style={{
                width: "45%",
                height: undefined,
                aspectRatio: 1.15,
                marginBottom: 15,
              }}
            />
            <CustomText
              type={typography.brand.name}
              color={colors.gray.ninth}
              style={{ textAlign: "center", marginBottom: 10 }}
            >
              TalkTogether
            </CustomText>
            <CustomText
              type={typography.brand.slogan}
              color={colors.gray.ninth}
              style={{ textAlign: "center" }}
            >
              Make new friends from all over the world and exchange knowledge
              with just one call.
            </CustomText>
          </View>
          <View style={{ width: "100%", marginTop: 100 }}>
            <CustomInput
              value={email}
              setValue={setEmail}
              placeholder="Digite seu email"
            />
            <Button
              uppercase={false}
              contained
              color={colors.gray.ninth}
              contentStyle={{ backgroundColor: colors.purple.fifth }}
              onPress={handleContinue}
              style={{ marginVertical: 20 }}
            >
              <CustomText
                type={typography.auth.button}
                color={colors.gray.ninth}
                style={{ textTransform: "capitalize" }}
              >
                {i18n.t("continue")}
              </CustomText>
            </Button>
          </View>
        </View>
      </View>
      {/* <View></View> */}
    </ScreenContainer>
  );
};
