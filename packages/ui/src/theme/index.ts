import { createTheme } from "@mui/material";

import typography from "./custom/typography";
import recipes from "./recipes";

const customTheme = {
  typography,
  cssVariables: true,
  spacing: 4,
  shape: {
    borderRadius: 8, // 컴포넌트의 모서리 둥글기 설정
  },
  components: recipes,
};

export const lightTheme = createTheme({
  ...customTheme,
  palette: {
    mode: "light",
  },
});

export const darkTheme = createTheme({
  ...customTheme,
  palette: {
    mode: "dark",
  },
});
