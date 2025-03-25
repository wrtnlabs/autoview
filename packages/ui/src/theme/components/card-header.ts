import { Components } from "@mui/material";

const recipe: Components["MuiCardHeader"] = {
  styleOverrides: {
    subheader: {
      color: "#888", // secondary color
    },
    content: {
      flexGrow: 1,
    },
    avatar: {
      marginRight: 12,
    },
    action: {
      position: "static",
      margin: 0,
      marginLeft: 12,
      display: "flex",
      alignSelf: "center",
    },
  },
};

export default recipe;
