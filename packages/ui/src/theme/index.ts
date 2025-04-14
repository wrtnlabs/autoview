import { createTheme } from "@mui/material";

import components from "./components";
import { dark, light } from "./palette";
import typography from "./typography";

export const autoviewTheme = {
  typography,
  cssVariables: true,
  spacing: 4,
  shape: {
    borderRadius: 8, // 컴포넌트의 모서리 둥글기 설정
  },
  components,
};

export const lightTheme = createTheme({
  ...autoviewTheme,
  palette: light,
});

export const darkTheme = createTheme({
  ...autoviewTheme,
  palette: dark,
});
