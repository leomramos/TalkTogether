import { Icon } from "@react-native-material/core";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import Styled from "styled-components/native";

const Container = Styled.View`
  background-color: ${({ colors }) => colors.surface};
  border: 1px solid;
  border-color: ${({ focused, border }) => (focused ? border : "transparent")}
  width: 100%;
  padding: 8px;
  padding-left: 15px;
  padding-right: 10px;
  border-radius: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Input = Styled.TextInput.attrs(({ text }) => {
  return {
    placeholderTextColor: text.input.placeholder,
  };
})`
  flex: 1;
  font-family: ${({ text }) => text.input.font};
  font-size: ${({ text }) => text.input.size};
  color: ${({ text }) => text.input.color};
`;

const SuffixIconContainer = Styled.View`
  align-items: center;
  justify-content: center;
`;

export default CustomInput = ({
  value = "",
  setValue = () => {},
  placeholder = "",
  icon = "",
}) => {
  const { colors, text, borderColor } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container colors={colors} border={borderColor} focused={isFocused}>
      <Input
        colors={colors}
        text={text}
        value={value}
        onChangeText={value => setValue(value)}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <SuffixIconContainer>
        <Icon
          name={icon}
          color={isFocused ? colors.focused : text.input.color}
          size={20}
        />
      </SuffixIconContainer>
    </Container>
  );
};
