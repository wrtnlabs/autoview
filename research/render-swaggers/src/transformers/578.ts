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
  // Since Schema.empty_object has no fields, there's no business data to display.
  // We render a simple, responsive placeholder using a vertical card with an icon and markdown.
  // This approach is easy to extend in the future when real data fields are added.
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        // Title clearly states the empty state
        title: "No Data",
        // Start element uses a neutral info icon to visually indicate an empty state
        startElement: {
          type: "Icon",
          id: "info-circle",  // free-solid-svg-icons name, in kebab-case
          size: 24,
          color: "gray"
        }
      },
      {
        type: "CardContent",
        // Using Markdown for a richer text experience on any device
        childrenProps: [
          {
            type: "Markdown",
            content: "There is no data available to display."
          }
        ]
      }
    ]
  };
}
