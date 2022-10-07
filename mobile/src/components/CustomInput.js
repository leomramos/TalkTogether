import React, { useState } from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import Styled from "styled-components/native";

const Container = Styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const PrefixIconContainer = Styled.View`
  flex: 1;
  align-items: center;
`;

const InputFieldContainer = Styled.View`
  flex: 8;
`;

const Input = Styled.TextInput`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 8px;
  padding-left: 15px;
  padding-right: 10px;
  border-radius: 100px;
  font-family: ${({ theme }) => theme.text.input.font};
  font-size: ${({ theme }) => theme.text.input.size};
  color: ${({ theme }) => theme.text.input.color};
`;

const SuffixIconContainer = Styled.View`
  flex: 1;
`;

export default CustomInput = ({ text = "", setText = () => {} }) => {
  const theme = useTheme();

  return (
    <Container>
      <Input
        theme={theme}
        value={text}
        onChangeText={text => setText(text)}
        placeholder={"Teste"}
      />
    </Container>
  );
};
