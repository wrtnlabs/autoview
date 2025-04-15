import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace shared {
    export type IntegerView = {
        result?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
            format: "int32"
        }>;
    };
}
type IAutoViewTransformerInputType = shared.IntegerView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the numeric result from the input.
  // The result is optional, so we handle the case where it might be undefined.
  const result = input.result;

  // Determine the icon based on whether the result exists.
  // We prefer using an icon to quickly convey the information and engage the user.
  // For a valid result, we use a 'chart-bar' icon (assumed to be available in the icon set).
  // When no result is present, we use a 'question-circle' icon to indicate the missing or unknown data.
  const headerIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: result !== undefined ? "chart-bar" : "question-circle",
    size: 24, // Using a moderate size to be visible but not overwhelming
    color: "blue" // A color that generally catches attention and is pleasant on both desktop and mobile devices
  };

  // Compose the header of the visualization card.
  // The card header uses the icon in the startElement slot,
  // along with a title and a brief description for context.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Data Visualization",
    description: "A graphical representation of your computed result.",
    startElement: headerIcon
  };

  // Create a Markdown component to effectively display the result.
  // We use markdown because text is unavoidable, but markdown allows for styled text
  // that is more engaging than plain text.
  // The content uses bold formatting to highlight the numerical value.
  const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: result !== undefined
      ? "**Result Visualization**\n\nThe computed result is: **" + result + "**"
      : "**Result Visualization**\n\n_No result available_"
  };

  // Compose the card content component that will hold our Markdown component.
  // Since the IAutoViewCardContentProps accepts a single component or an array of components,
  // we directly pass our markdownComponent.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: markdownComponent
  };

  // Finally, compose the vertical card that aggregates the header and content.
  // A vertical card is chosen to leverage a more traditional mobile-responsive layout.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  // Return the fully composed component props suitable for visualization.
  return verticalCard;
}
