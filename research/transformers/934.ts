import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * An object without any properties.
     *
     * @title Empty Object
    */
    export type empty_object = {};
}
type IAutoViewTransformerInputType = Schema.empty_object;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Since the input has no fields (Schema.empty_object), we handle the empty case gracefully
  // by displaying a user-friendly message with an icon inside a vertical card.
  // This layout is responsive and works well on both desktop and mobile.

  // Card header with an informational icon and title
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "No Data Available",
    // Use a neutral icon to visualize the empty state
    startElement: {
      type: "Icon",
      id: "info-circle",    // FontAwesome icon name without prefix
      size: 32,             // Reasonable size for visibility
      color: "gray"         // Neutral color for informative state
    }
  };

  // Card content with a markdown description
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Use markdown for richer text formatting and better readability
    childrenProps: {
      type: "Markdown",
      content: "There is currently no data to display. Please check back later or upload data to get started."
    }
  };

  // Assemble into a vertical card for a clean and responsive layout
  return {
    type: "VerticalCard",
    childrenProps: [header, content]
  };
}
