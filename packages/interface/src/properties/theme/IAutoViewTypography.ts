export namespace IAutoViewTypography {
  export type IVariant =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "subtitle3"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "footnote";

  export type ITextColor =
    | "primary"
    | "secondary"
    | "tertiary"
    | "info"
    | "success"
    | "disabled"
    | "error";

  export type IFontWeight =
    | 300 // Light
    | 400 // Regular
    | 500 // Medium
    | 600 // SemiBold
    | 700 // Bold
    | 900; // Black
}
