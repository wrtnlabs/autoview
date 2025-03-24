import { Components } from "@mui/material";

const recipe: Components["MuiAccordionSummary"] = {
  styleOverrides: {
    root: {
      padding: 0,
      "&.Mui-expanded": {
        minHeight: "unset",
      },
    },
    content: {
      padding: "8px 12px",
      fontSize: "1rem",

      "&.Mui-expanded": {
        margin: 0,
        minHeight: "unset",
      },
    },
  },
};

export default recipe;
