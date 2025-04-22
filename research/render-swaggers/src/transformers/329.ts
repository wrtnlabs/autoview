import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Code Of Conduct
     *
     * @title Code Of Conduct
    */
    export type code_of_conduct = {
        key: string;
        name: string;
        url: string & tags.Format<"uri">;
        body?: string;
        html_url: (string & tags.Format<"uri">) | null;
    };
}
type IAutoViewTransformerInputType = Schema.code_of_conduct;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Create a card header displaying the Code of Conduct name and key,
  // with an icon to visually represent a document.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: input.key,
    startElement: {
      // Use a file icon to indicate the document nature of the Code of Conduct
      type: "Icon",
      id: "file-alt",
      color: "blue",
      size: 24,
    },
  };

  // If the body is provided, render it as markdown for rich formatting,
  // otherwise omit the content section entirely.
  const contentSection: IAutoView.IAutoViewCardContentProps | null = input.body
    ? {
        type: "CardContent",
        childrenProps: {
          type: "Markdown",
          content: input.body,
        },
      }
    : null;

  // Provide a footer with a button linking to the full Code of Conduct URL.
  // Prefer html_url if available; otherwise fall back to the raw url.
  const targetUrl: string = input.html_url ?? input.url;
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      label: "View Code of Conduct",
      href: targetUrl,
      variant: "text",
      startElement: {
        // External link icon to denote navigation
        type: "Icon",
        id: "external-link-alt",
        color: "blue",
        size: 16,
      },
    },
  };

  // Assemble the vertical card, filtering out any null sections.
  const children = [
    header,
    ...(contentSection ? [contentSection] : []),
    footer,
  ];

  return {
    type: "VerticalCard",
    childrenProps: children,
  };
}
