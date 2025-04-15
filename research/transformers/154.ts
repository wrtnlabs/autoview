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
  // We create a vertical card component to display the integer data.
  // Using a card improves visuals and responsiveness on mobile devices.
  // The card contains a header with an icon and a title, as well as a markdown content
  // which displays the provided value (or a message if the value is absent).

  // Define the header component including an icon that represents data visualization.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Data Visualization",
    description: "Displaying integer value",
    // startElement accepts an Icon component. We use a chart icon to depict data.
    startElement: {
      type: "Icon",
      // Use a common icon identifier in kebab-case.
      id: "chart-bar",
      color: "blue",
      // Size is chosen to be medium for visual clarity.
      size: 24
    }
  };

  // Determine the markdown content based on the input.
  // If input.result is defined, display it in bold within a markdown title.
  // Otherwise, display a "No Data" message using markdown.
  const markdownContent = input.result !== undefined
    ? `### Result\n\n**${input.result}**`
    : "### No Data\n\nNo integer value was provided.";

  // Create the content component using the Markdown component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // childrenProps can be a single component; here we insert our markdown component.
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    }
  };

  // Compose the final vertical card component, allowing for responsiveness and clear visualization.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    // childrenProps is an array of components: header and content.
    childrenProps: [
      cardHeader,
      cardContent
    ]
  };

  // Return the transformed component that will be rendered by the UI.
  return verticalCard;
}
