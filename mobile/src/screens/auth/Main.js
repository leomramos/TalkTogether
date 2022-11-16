import React, { useState } from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { CustomInput, CustomText, ScreenContainer } from "../../components/";

import i18n from "../../i18n";

export default Main = ({ navigation }) => {
  const { typography, colors, screen } = useTheme();

  const [email, setEmail] = useState("");

  const handleContinue = () => {};

  return (
    <ScreenContainer>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingRight: screen.padding.left + 10,
          paddingLeft: 10,
          paddingTop: 80,
          overflow: "hidden",
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "flex-end" }}>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 25,
            }}
          >
            <CustomText
              type={typography.brand.name}
              color={colors.gray.ninth}
              style={{ textAlign: "center", marginBottom: 15 }}
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
          <View style={{ width: "100%", marginTop: 120 }}>
            <CustomInput
              value={email}
              setValue={setEmail}
              label="E-mail"
              placeholder="Digite seu email"
            >
              Teste
            </CustomInput>
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
              >
                Continue
              </CustomText>
            </Button>
          </View>
        </View>
      </View>
      {/* <View></View> */}
    </ScreenContainer>
  );
};
