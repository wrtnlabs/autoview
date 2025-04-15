import type * as IAutoView from "@autoview/interface";
type IAutoViewTransformerInputType = string;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // The goal is to produce a UI component that visually represents the provided input.
  // We choose to represent the data inside a vertical card that includes a header and a content part.
  
  // Create a header component with an icon.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Data Overview",
    description: "Visual summary of your input",
    // startElement accepts an Icon, among other types.
    startElement: {
      type: "Icon",
      id: "eye", // using an "eye" icon to indicate visual inspection
      color: "blue",
      size: 24,
    }
  };

  // Regular expression to check if the input is a valid URL.
  // This simple regex checks for http(s) protocol; in production you might have more robust URL validation.
  const urlRegex = /^(https?:\/\/[^\s]+)$/;

  // If the input is a valid URL, assume it is an image URL and display it with an Image component.
  if (urlRegex.test(input)) {
    const imageComponent: IAutoView.IAutoViewImageProps = {
      type: "Image",
      src: input,
      alt: "Input Image",
    };

    // Compose a vertical card with a header and an image.
    const card: IAutoView.IAutoViewVerticalCardProps = {
      type: "VerticalCard",
      childrenProps: [
        cardHeader,
        // CardMedia is ideal for images.
        {
          type: "CardMedia",
          src: input,
        }
      ],
    };
    return card;
  } else {
    // For non-URL input, use a Markdown component for a rich text presentation.
    // We embed the input string in markdown formatting to improve readability.
    const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: `**Extracted Data:**\n\n${input}`,
    };

    // Wrap the markdown component inside CardContent.
    const cardContent: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      childrenProps: markdownComponent,
    };

    // Compose a vertical card with a header and text-based content.
    const card: IAutoView.IAutoViewVerticalCardProps = {
      type: "VerticalCard",
      childrenProps: [
        cardHeader,
        cardContent,
      ],
    };
    return card;
  }
}
