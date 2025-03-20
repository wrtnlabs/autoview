import { Components } from "@mui/material";

const recipe: Components["MuiCardHeader"] = {
  styleOverrides: {
    subheader: {
      // color: "yellow",
    },
    action: {
      margin: 0,
      display: "flex",
      alignSelf: "center",
    },
  },
};

export default recipe;
