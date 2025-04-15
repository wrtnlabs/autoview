import type * as IAutoView from "@autoview/interface";
namespace shared {
    export type StringView = {
        result?: string;
    };
}
type IAutoViewTransformerInputType = shared.StringView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the input content; if it's missing, we use a default message.
  const content: string = input.result ? input.result : "No data provided.";

  // Create a Card Header to introduce the data visualization.
  // We use an icon as the starting element to create a visual cue.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Data Visualization",
    description: "Overview of the provided data",
    // Use an icon to signal the data content. The id 'database' is in kebab-case.
    startElement: {
      type: "Icon",
      id: "database",
      size: 24,
      color: "blue"
    }
  };

  // Create a Card Content component using markdown.
  // Markdown lets us format text (e.g. with headers, lists, etc.) and to embed images if needed.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // The markdown component is our preferred way to represent text.
    childrenProps: {
      type: "Markdown",
      content: content
    }
  };

  // Optionally, if further visual elements are desired, you could extend this transformation.
  // For example, you might detect URLs in the input string and display them via an Image component,
  // or add additional icons/chips based on recognized keywords.
  // For production, the transformation logic should be enhanced according to actual requirements.

  // Compose the final vertical card component.
  // A vertical card can arrange the header and content in a responsive layout, suitable for mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  // Return the composed component props.
  return verticalCard;
}
