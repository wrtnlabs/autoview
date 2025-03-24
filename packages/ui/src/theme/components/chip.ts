import { Components } from "@mui/material";

const recipe: Components["MuiChip"] = {
  styleOverrides: {
    root: {
      padding: 4,
      width: "max-content",
    },

    deleteIcon: {
      marginRight: "8px", // deleteIcon의 오른쪽 마진 설정
    },
    icon: {
      marginLeft: "8px", // icon의 왼쪽 마진 설정
    },

    label: {
      padding: 4,
    },
  },
};

export default recipe;
