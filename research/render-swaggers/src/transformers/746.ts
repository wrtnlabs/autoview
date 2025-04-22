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



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /**
   * Helper: Safely parse an ISO date string and convert to a locale-aware string.
   * If parsing fails, return the raw input.
   */
  const formatDate = (iso: string): string => {
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) throw new Error("Invalid date");
      // Short date + time for compact display on mobile
      return d.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  // Build a DataList of created/updated timestamps with icons
  const timestampList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        // Use an array of components: icon + label text
        label: [
          { type: "Icon", id: "calendar", color: "indigo", size: 16 },
          { type: "Text", content: "Created", variant: "subtitle2", color: "gray" }
        ],
        value: { type: "Text", content: formatDate(input.created_at), variant: "body2" },
      },
      {
        type: "DataListItem",
        label: [
          { type: "Icon", id: "clock", color: "teal", size: 16 },
          { type: "Text", content: "Updated", variant: "subtitle2", color: "gray" }
        ],
        value: { type: "Text", content: formatDate(input.updated_at), variant: "body2" },
      },
    ],
  };

  // Compose a card showing the variable name and value, plus timestamps in the content
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        // Title is the variable name; include a tag icon for visual cue
        title: input.name,
        description: input.value,
        startElement: {
          type: "Icon",
          id: "tag",
          color: "blue",
          size: 20,
        },
      },
      {
        type: "CardContent",
        // Embed the DataList of timestamps
        childrenProps: timestampList,
      },
    ],
  };
}
