import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Gitignore Template
     *
     * @title Gitignore Template
    */
    export type gitignore_template = {
        name: string;
        source: string;
    };
}
type IAutoViewTransformerInputType = Schema.gitignore_template;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const { name, source } = input;

  // Prepare markdown content for the .gitignore source.
  // Use fenced code block with language hint for better syntax highlighting.
  // If source is empty or only whitespace, display a placeholder message.
  const trimmed = source.trim();
  const markdownContent = trimmed
    ? [`\`\`\`gitignore`, trimmed, `\`\`\``].join("\n")
    : "_No `.gitignore` rules defined._";

  // Compose a vertical card layout:
  // - CardHeader: shows the template name with a code icon.
  // - CardContent: renders the .gitignore content as markdown.
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: name,
        // Use a monospace/code icon to visually indicate file/template
        startElement: {
          type: "Icon",
          id: "code",       // FontAwesome "code" icon
          size: 24,
          color: "gray",
        },
      },
      {
        type: "CardContent",
        // Single markdown child; AutoView will render it as rich content.
        childrenProps: {
          type: "Markdown",
          content: markdownContent,
        },
      },
    ],
  };
}
