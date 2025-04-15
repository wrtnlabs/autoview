import type * as IAutoView from "@autoview/interface";
type CANNOT_FINDONE_ARTICLE = any;
namespace ResponseForm_lt_ArticleType {
    export type DetailArticle_gt_ = any;
}
type IAutoViewTransformerInputType = any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We aim to transform the input data into a UI that visualizes the data effectively.
  // Our strategy is to compose a vertical card which contains a header (with an icon), an optional media section,
  // and a content section that uses Markdown to render a textual (JSON) representation of the input, if needed.
  
  // Build the card header.
  // Allowed types for header.startElement include IAutoViewIconProps.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Data Visualization",
    description: "Overview of the provided data",
    startElement: {
      id: "chart-bar",   // using a representative icon id
      type: "Icon",
      size: 24,
      // Optionally, color or other props can be added if desired.
    } as IAutoView.IAutoViewIconProps,
  };

  // Initialize an array to hold child components for the vertical card.
  const childrenComponents: (
    | IAutoView.IAutoViewCardHeaderProps
    | IAutoView.IAutoViewCardMediaProps
    | IAutoView.IAutoViewCardContentProps
  )[] = [];
  childrenComponents.push(cardHeader);

  // Optionally add a media section if the input data contains an image URL.
  // We check if input is an object and contains the "imageUrl" property (of type string).
  if (input && typeof input === "object" && "imageUrl" in input && typeof (input as any).imageUrl === "string") {
    const cardMedia: IAutoView.IAutoViewCardMediaProps = {
      type: "CardMedia",
      src: (input as any).imageUrl,
    };
    childrenComponents.push(cardMedia);
  }

  // For the content section, we use Markdown to render the input data.
  // This approach provides a more engaging and flexible text display compared to plain text.
  // The markdown content uses a code block to display a formatted JSON representation of the input.
  const markdownContent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: "json\n" + JSON.stringify(input, null, 2) + "\n```",
  };

  // Compose the card content using the markdown component.
  // IAutoViewCardContentProps can accept a single presentation component, here we use our markdown component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: markdownContent,
  };
  childrenComponents.push(cardContent);

  // Compose the final vertical card by aggregating the header, optional media, and content components.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: childrenComponents,
  };

  // Return the transformed data structured as a UI component.
  return verticalCard;
}
