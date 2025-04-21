import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * @title Actions Variable
    */
    export type actions_variable = {
        /**
         * The name of the variable.
        */
        name: string;
        /**
         * The value of the variable.
        */
        value: string;
        /**
         * The date and time at which the variable was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the variable was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
    };
}
type IAutoViewTransformerInputType = Schema.actions_variable;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Helper to format ISO date strings for display in the user's locale
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString();

  // Construct a DataList to show key/value pairs in a compact, responsive list
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      // Variable value
      {
        type: "DataListItem",
        // Use an icon + text for the label
        label: [
          { type: "Icon", id: "file-alt", color: "gray", size: 16 },
          { type: "Text", content: "Value", variant: "body2" }
        ],
        // Use TextProps for the actual value
        value: {
          type: "Text",
          content: input.value,
          variant: "body1",
          // Allow long values to wrap
          lineClamp: 0
        }
      },
      // Creation timestamp
      {
        type: "DataListItem",
        label: [
          { type: "Icon", id: "calendar-plus", color: "teal", size: 16 },
          { type: "Text", content: "Created At", variant: "body2" }
        ],
        value: {
          type: "Text",
          content: formatDate(input.created_at),
          variant: "body1"
        }
      },
      // Update timestamp
      {
        type: "DataListItem",
        label: [
          { type: "Icon", id: "calendar-alt", color: "cyan", size: 16 },
          { type: "Text", content: "Updated At", variant: "body2" }
        ],
        value: {
          type: "Text",
          content: formatDate(input.updated_at),
          variant: "body1"
        }
      }
    ]
  };

  // Compose a vertical card: header + content
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        // Show variable name prominently
        title: input.name,
        // Show a subtle subtitle of the last update
        description: `Last updated: ${formatDate(input.updated_at)}`,
        // A tag icon to visually indicate this is a named variable
        startElement: {
          type: "Icon",
          id: "tag",
          color: "blue",
          size: 24
        }
      },
      {
        type: "CardContent",
        // Nest the DataList inside the card
        childrenProps: dataList
      }
    ]
  };
}
