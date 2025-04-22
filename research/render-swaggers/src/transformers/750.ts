import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Blob
     *
     * @title Blob
    */
    export type blob = {
        content: string;
        encoding: string;
        url: string & tags.Format<"uri">;
        sha: string;
        size: (number & tags.Type<"int32">) | null;
        node_id: string;
        highlighted_content?: string;
    };
}
type IAutoViewTransformerInputType = Schema.blob;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to quickly create a Text component
  const makeText = (content: string): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content,
    // Use a small caption style for data list entries
    variant: "body2",
    color: "gray",
  });

  // Helper to create a Markdown component for code blocks or rich text
  const makeMarkdown = (md: string): IAutoView.IAutoViewMarkdownProps => ({
    type: "Markdown",
    content: md,
  });

  // Build a list of data items to display each field of the blob
  const children: IAutoView.IAutoViewDataListItemProps[] = [];

  // Node ID
  children.push({
    type: "DataListItem",
    label: makeText("Node ID"),
    value: makeText(input.node_id),
  });

  // SHA
  children.push({
    type: "DataListItem",
    label: makeText("SHA"),
    value: makeText(input.sha),
  });

  // URL (render as link in Markdown for better UX)
  children.push({
    type: "DataListItem",
    label: makeText("URL"),
    value: makeMarkdown(`[View Blob](${input.url})`),
  });

  // Size (handle null gracefully)
  children.push({
    type: "DataListItem",
    label: makeText("Size"),
    value: makeText(
      input.size !== null
        ? `${input.size.toLocaleString()} bytes`
        : "Unknown"
    ),
  });

  // Encoding
  children.push({
    type: "DataListItem",
    label: makeText("Encoding"),
    value: makeText(input.encoding),
  });

  // If highlighted content is provided, show it in a syntax-highlighted code block.
  // Otherwise, fall back to raw content in a code block.
  const codeContent = input.highlighted_content ?? input.content;
  // Wrap in Markdown triple-backticks to render properly
  const codeBlock = `\`\`\`\n${codeContent}\n\`\`\``;
  children.push({
    type: "DataListItem",
    label: makeText("Content"),
    value: makeMarkdown(codeBlock),
  });

  // Compose the final DataList component
  return {
    type: "DataList",
    childrenProps: children,
  };
}
