import { IAutoViewMarkdownProps } from "@autoview/interface";

import { TransformToComponentProps } from "../../utils/TransformToComponentProps";
import { MarkdownRenderer } from "./MarkdownRenderer";

export interface MarkdownProps
  extends TransformToComponentProps<IAutoViewMarkdownProps> { }

export const Markdown = ({ content }: MarkdownProps) => {
  return <MarkdownRenderer>{content}</MarkdownRenderer>
};
