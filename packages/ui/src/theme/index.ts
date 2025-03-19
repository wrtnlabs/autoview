import { createTheme } from "@mui/material";

const commonTheme = {
  cssVariables: true,
  spacing: 8, // 기본 간격 단위 설정
  shape: {
    borderRadius: 8, // 컴포넌트의 모서리 둥글기 설정
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "20px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // borderRadius: 1,
          // backgroundColor: "#000",
          // color: "#fff",
        },
      },
    },
    MuiCardHeader: {
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
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          paddingTop: 12,
          paddingRight: 16,
          paddingBottom: 12,
          paddingLeft: 16,
        },
      },
    },

    // 다른 컴포넌트들의 스타일 오버라이드도 이곳에 추가 가능
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  ...commonTheme,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  ...commonTheme,
});
