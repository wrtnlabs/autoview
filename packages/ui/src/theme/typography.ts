import { TypographyOptions } from "@mui/material/styles/createTypography";

const typography: TypographyOptions = {
  fontFamily: [
    '"Pretendard"',
    '"Inter"',
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),

  htmlFontSize: 16,

  h1: {
    fontSize: "3.875rem",
    fontWeight: 700,
    lineHeight: 1.28,
    letterSpacing: "-0.0034em",
  },

  h2: {
    fontSize: "3rem",
    fontWeight: 700,
    lineHeight: 1.28,
    letterSpacing: "-0.0031em",
  },

  h3: {
    fontSize: "2.25rem",
    fontWeight: 700,
    lineHeight: 1.28,
    letterSpacing: "-0.0028em",
  },

  h4: {
    fontSize: "1.375rem",
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: "-0.00194em",
  },

  h5: {
    fontSize: "1rem",
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: "0.00048em",
  },

  h6: {
    fontSize: "0.8125rem",
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.002em",
  },

  subtitle1: {
    fontSize: "1.125rem",
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: "-0.00048em",
  },

  subtitle2: {
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: "-0.00048em",
  },

  subtitle3: {
    fontSize: "0.875rem",
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: "0.00145em",
  },

  body1: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.00048em",
  },

  body2: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.00145em",
  },

  caption: {
    fontSize: "0.8125rem",
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.002em",
  },

  footnote: {
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.00252em",
  },
};

export default typography;
