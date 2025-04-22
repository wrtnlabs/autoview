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
  // Since the input schema is an empty object, there is no actual data to visualize.
  // Provide a user‑friendly placeholder UI indicating the absence of data.
  
  // Compose a vertical card with a header and markdown content.
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Card header with an informational icon to indicate no data.
        type: "CardHeader",
        title: "No Data",
        description: "There is no data to display.",
        startElement: {
          type: "Icon",
          id: "info-circle",    // FontAwesome “info-circle” icon
          color: "gray",
          size: 24,
        },
      },
      {
        // Card content with markdown for richer text formatting.
        type: "CardContent",
        childrenProps: [
          {
            type: "Markdown",
            content: [
              "#### No Data Available",
              "",
              "The dataset is empty. Please provide valid data to visualize."
            ].join("\n"),
          }
        ],
      }
    ],
  };
}
