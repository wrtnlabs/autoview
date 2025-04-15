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
  // Determine if the input has a valid result.
  // If undefined, we prepare UI elements to display a "no data" message.
  const hasData = input.result !== undefined;

  // Create a header for the card.
  // The header includes an icon that is contextually chosen:
  // - "chart-bar" if there is a valid numeric result to show the analytical/graphical nature.
  // - "exclamation-triangle" if there is no data.
  const headerProps: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Data Overview",
    description: hasData
      ? "Current value is displayed below."
      : "No data available.",
    startElement: {
      type: "Icon",
      id: hasData ? "chart-bar" : "exclamation-triangle",
      color: hasData ? "blue" : "red",
      size: 24 // size is chosen from allowed numbers
    }
  };

  // Compose markdown content to display the numerical value.
  // Markdown is preferred over plain text to enhance visual engagement.
  // If there is data, we construct a markdown block highlighting the result;
  // otherwise, we inform the user that no data is available.
  const markdownContent = hasData
    ? `## Result\n\nThe current value is **${input.result}**.`
    : `## No Data\n\nThere is currently no data to display.`;

  // Create the card content using a Markdown component.
  // This ensures that even the textual representation is rendered in a rich and visually engaging format.
  const contentProps: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    }
  };

  // Compose the final UI component as a Vertical Card.
  // A Vertical Card is chosen because it is versatile and responsive, adjusting well on mobile devices.
  // It aggregates the header and content components.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [headerProps, contentProps]
  };

  // Return the formatted component which will be rendered by the UI renderer.
  return verticalCard;
}
