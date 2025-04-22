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
   * Since the input type is an empty object with no meaningful fields,
   * we provide a user-friendly fallback UI indicating that there's no data to visualize.
   * We use a VerticalCard for responsiveness, with a header icon and a markdown description.
   */
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // CardHeader with an icon to visually indicate the state
        type: "CardHeader",
        title: "No Data Available",
        description: "There is nothing to display. Please provide data to visualize.",
        startElement: {
          type: "Icon",
          id: "info-circle",   // FontAwesome icon name in kebab-case
          color: "gray",
          size: 32
        }
      },
      {
        // CardContent with markdown for better readability on all devices
        type: "CardContent",
        childrenProps: {
          type: "Markdown",
          content: `
## No Data

It seems there is no information to render.  
Ensure your data source is correctly configured and try again.
`
        }
      }
    ]
  };
}
