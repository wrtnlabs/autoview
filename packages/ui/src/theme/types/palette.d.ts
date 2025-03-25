import { Palette } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    red: Palette["red"];
    orange: Palette["orange"];
    yellow: Palette["yellow"];
    lime: Palette["lime"];
    green: Palette["green"];
    teal: Palette["teal"];
    cyan: Palette["cyan"];
    blue: Palette["blue"];
    indigo: Palette["indigo"];
    violet: Palette["violet"];
    pink: Palette["pink"];
    gray: Palette["gray"];
    darkGray: Palette["darkGray"];
  }

  interface PaletteOptions {
    red?: Palette["red"];
    orange?: Palette["orange"];
    yellow?: Palette["yellow"];
    lime?: Palette["lime"];
    green?: Palette["green"];
    teal?: Palette["teal"];
    cyan?: Palette["cyan"];
    blue?: Palette["blue"];
    indigo?: Palette["indigo"];
    violet?: Palette["violet"];
    pink?: Palette["pink"];
    gray?: Palette["gray"];
    darkGray?: Palette["darkGray"];
  }
}
