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
  /**
   * Since the input type is an empty object (no payload), we treat every call as
   * an "empty state". We provide a single VerticalCard with a header and markdown
   * content that gracefully informs the user that no data is available.
   *
   * This approach:
   * - Uses an iconic representation in the CardHeader to draw the user's attention.
   * - Uses a Markdown component for the explanatory text.
   * - Is fully responsive: VerticalCard layouts collapse naturally on narrow screens.
   */

  // CardHeader with an information icon and a title.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "No Data Available",
    description: undefined, // no additional subtitle
    startElement: {
      type: "Icon",
      id: "exclamation-circle", // FontAwesome icon in kebab-case
      color: "gray",
      size: 24,
    },
  };

  // CardContent containing a Markdown message.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: "There is currently no data to display. Please provide valid input to visualize.",
    },
  };

  // The VerticalCard itself, composed of the header and content.
  const emptyStateCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return emptyStateCard;
}
