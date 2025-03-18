export namespace IAutoViewColor {
  export type IVariant =
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info";

  export type IScale =
    | "red"
    | "orange"
    | "yellow"
    | "lime"
    | "green"
    | "teal"
    | "cyan"
    | "blue"
    | "indigo"
    | "violet"
    | "pink";

  export type IHex = `#${string}`;
}
