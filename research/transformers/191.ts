import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type RedirectionView = {
    redirection?: Redirection;
};
type Redirection = {
    originalUrl?: string;
    expireAt?: number & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
    shortUrl?: string;
};
type IAutoViewTransformerInputType = RedirectionView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We're visualizing data contained within the redirection object.
  // If redirection data exists, we'll display its details in a responsive vertical card.
  // If no redirection data is provided, we'll render a simple card stating that no data is available.
  
  // Prepare header with an icon to immediately indicate a link/redirection.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Redirection Info",
    description: input.redirection ? "Below are the redirection details:" : "No redirection data available.",
    // Using an icon component as the start element for visual emphasis.
    startElement: {
      type: "Icon",
      id: "link", // icon name in kebab-case without any prefix
      color: "blue",
      size: 24,
    },
  };

  // Build the markdown content dynamically based on available redirection data.
  let markdownContent = "";
  if (input.redirection) {
    markdownContent += "## Redirection Details\n\n";
    if (input.redirection.originalUrl) {
      // Using markdown link syntax.
      markdownContent += `- **Original URL:** [${input.redirection.originalUrl}](${input.redirection.originalUrl})\n`;
    }
    if (typeof input.redirection.expireAt === "number") {
      // Format expireAt as a human-readable date.
      const expireDate = new Date(input.redirection.expireAt * 1000).toLocaleString();
      markdownContent += `- **Expires At:** ${expireDate}\n`;
    }
    if (input.redirection.shortUrl) {
      markdownContent += `- **Short URL:** [${input.redirection.shortUrl}](${input.redirection.shortUrl})\n`;
    }
  } else {
    // Fallback message if no redirection data exists.
    markdownContent = "## No redirection data available.";
  }

  // Compose the card content using a markdown component for better visual presentation.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // childrenProps accepts either an array or a single component.
    childrenProps: {
      type: "Markdown",
      content: markdownContent,
    } as IAutoView.IAutoViewMarkdownProps,
  };

  // Combine header and content in a vertical card for a structured layout.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    // Children components are an array of visual components: header and card content.
    childrenProps: [header, cardContent],
  };

  // Return the composed UI component to be rendered by the visualization engine.
  return verticalCard;
}
