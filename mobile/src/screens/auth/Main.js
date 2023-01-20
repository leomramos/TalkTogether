import { API_URL } from "@env";
import axios from "axios";
import React, { useState } from "react";
import { Image, Keyboard, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useQuery } from "react-query";
import { useUser, useWarning } from "../../../App";
import { CustomInput, CustomText, ScreenContainer } from "../../components/";

import i18n from "../../i18n";

export default Main = ({ navigation }) => {
  const { typography, colors, screen } = useTheme();

  const { setWarning } = useWarning();
  const { user, setUser, setProfile } = useUser();

  const [email, setEmail] = useState("");

  const loginUser = user => {
    setUser(user);
    navigation.navigate("LoginAuth");
  };

  const registerUser = email => {
    setUser({ email });
    navigation.navigate("RegisterAuth");
  };

  const searchUser = useQuery(
    "searchUser" + email,
    () =>
      axios
        .post(`${API_URL}/users/search`, {
          email,
        })
        .then(res => {
          res.data ? loginUser(res.data) : registerUser(email);
        })
        .catch(e => {
          throw e;
        }),
    { enabled: false }
  );

  const handleContinue = () => {
    Keyboard.dismiss();

    /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
      ? searchUser.refetch()
      : setWarning(i18n.t("enterEmailError"));
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
              placeholder={i18n.t("enterEmail")}
              restriction={text => !text.includes(" ")}
              autoCapitalize="none"
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
    </ScreenContainer>
  );
};
