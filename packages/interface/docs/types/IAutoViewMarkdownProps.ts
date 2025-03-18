import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";

export interface IAutoViewMarkdownProps
  extends IAutoViewComponentPropsBase<"Markdown"> {
  content: string;
}
