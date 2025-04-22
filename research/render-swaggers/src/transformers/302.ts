import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type ResponseForm_lt_true_gt_ = any;
    export type ALREADY_FOLLOW_USER = any;
    export type CANNOT_FIND_ONE_DESIGNER_TO_FOLLOW = any;
    export type CANNOT_FOLLOW_MYSELF = any;
}
type IAutoViewTransformerInputType = any | any | any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no data, render a simple text component
  if (input == null) {
    return {
      type: "Text",
      content: "No data available.",
    };
  }

  // Build a JSON code block in Markdown to visualize arbitrary data structures
  // This leverages the Markdown component for rich text display
  const jsonCode = "json\n" + JSON.stringify(input, null, 2) + "\n```";

  // Compose a VerticalCard with a header and content
  // - CardHeader: shows a title and an icon
  // - CardContent: embeds the JSON dump in Markdown
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Data Preview",
        description: "Structured view of the input payload",
        // Use a database icon to represent generic data
        startElement: {
          type: "Icon",
          id: "database",
          color: "blue",
          size: 24,
        },
      },
      {
        type: "CardContent",
        // We embed the JSON code block here via Markdown
        childrenProps: {
          type: "Markdown",
          content: jsonCode,
        },
      },
    ],
  };
}
