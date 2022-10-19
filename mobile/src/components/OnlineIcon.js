import React from "react";
import { useTheme } from "react-native-paper";
import Styled from "styled-components/native";

const Circle = Styled.View`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  background-color: ${({ color }) => color};
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;

const OnlineIcon = ({ size = 48, flag, background, sortIcon = false }) => {
  const { colors } = useTheme();
  size = sortIcon ? 25 : size;

  const borderCircleSize = (7 * size) / 20;
  const outerCircleSize = size / 4;
  const innerCircleSize = size / 9;
  const statusOffset = -(borderCircleSize - outerCircleSize) / 2;
  return (
    <Circle
      size={borderCircleSize}
      color={sortIcon ? colors.gray.third : background || colors.gray.second}
      style={{
        position: "absolute",
        bottom: sortIcon ? 12.5 : statusOffset,
        right: sortIcon ? 12.5 : statusOffset,
        padding: statusOffset,
        zIndex: 9999,
      }}
    >
      {flag ? (
        <Circle
          size={outerCircleSize}
          color={"transparent"}
          style={{
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: flag }}
            resizeMode="cover"
            alt={"User country flag"}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Circle>
      ) : (
        <Circle size={outerCircleSize} color={colors.purple.fifth}>
          <Circle
            size={innerCircleSize}
            color={
              sortIcon ? colors.gray.third : background || colors.gray.second
            }
          ></Circle>
        </Circle>
      )}
    </Circle>
  );
};

export default OnlineIcon;
