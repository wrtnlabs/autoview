import { IAutoViewMarkdownProps } from "@autoview/interface";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface MarkdownProps
  extends TransformToComponentProps<IAutoViewMarkdownProps> {}

// TODO: Markdown renderer
export const Markdown = ({ content }: MarkdownProps) => {
  return renderComponent(content);
};
