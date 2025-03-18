export namespace IAutoViewTypography {
  export type IVariant =
    | "body1" // Default body text (16px)
    | "body2" // Smaller body text (14px)
    | "button" // Button text style (15px)
    | "caption1" // Small caption text (13px)
    | "caption2" // Smaller caption text (12px)
    | "h1" // Heading 1 (40px)
    | "h2" // Heading 2 (30px)
    | "h3" // Heading 3 (26px)
    | "h4" // Heading 4 (22px)
    | "h5" // Heading 5 (18px)
    | "h6" // Heading 6 (16px)
    | "inherit" // Inherits styles from parent
    | "subtitle1" // Subtitle text (20px)
    | "subtitle2"; // Smaller subtitle text (18px)

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
