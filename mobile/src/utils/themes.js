import { DefaultTheme } from "react-native-paper";

const common = {
  ...DefaultTheme,
  screen: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  text: {
    pageTitle: {
      font: "Inter_700Bold",
      size: "24px",
      color: "#FDFDFD",
    },
    input: {
      font: "Inter_500Medium",
      size: "14px",
      color: "#CECED0",
      placeholder: "#76767C",
    },
  },
  colors: {
    ...DefaultTheme.colors,
  },
};

const darkTheme = {
  ...common,
  dark: true,
  text: {
    ...common.text,
    pageTitle: {
      ...common.text.pageTitle,
      color: "#FDFDFD",
    },
    input: {
      ...common.text.input,
      color: "#CECED0",
      placeholder: "#76767C",
    },
  },
  colors: {
    ...common.colors,
    background: "#21212B",
    focused: "#9D4EDD",
    unfocused: "#909095",
    backgroundAccent: "#181820",
    surface: "#272732",
  },
};

export default Theme = {
  get: t => {
    switch (t) {
      case "dark":
        return darkTheme;
    }
  },
};
