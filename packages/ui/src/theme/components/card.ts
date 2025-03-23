import { Components } from "@mui/material";

const recipe: Components["MuiCard"] = {
  styleOverrides: {
    root: {
      minWidth: 320,
      borderRadius: 5,
      boxShadow: "none",
      border: "1px solid #ddd",
    },
  },
};

export default recipe;
