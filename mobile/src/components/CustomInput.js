import { Icon } from "@react-native-material/core";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import Styled from "styled-components/native";

import i18n from "../i18n";

export default CustomInput = ({
  value = "",
  setValue = () => {},
  label = "",
  icon = "",
  action = () => {},
  search = false,
  query = () => {},
  dense = false,
}) => {
  const { colors, text, borderColor } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      dense={dense}
      style={{ backgroundColor: colors.surface }}
      mode="outlined"
      label={!search && label}
      placeholder={search ? i18n.t("search") : label}
      value={value}
      onChangeText={text => setValue(text)}
      selectionColor={colors.focused}
      outlineColor={value === "" ? "transparent" : borderColor}
      activeOutlineColor={borderColor}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      left={
        search && (
          <TextInput.Icon
            name={"magnify"}
            size={20}
            color={
              isFocused || value !== "" ? colors.focused : text.input.color
            }
            onPress={() => query()}
            forceTextInputFocus={false}
          />
        )
      }
      right={
        <TextInput.Icon
          name={search && value !== "" ? "close" : icon}
          size={search ? 15 : 20}
          color={
            search
              ? text.input.placeholder
              : isFocused || value !== ""
              ? colors.focused
              : text.input.color
          }
          onPress={() => (search ? setValue("") : action())}
        />
      }
      theme={{
        colors: {
          text: text.input.color,
          placeholder: text.input.placeholder,
        },
      }}
    />
  );
};
