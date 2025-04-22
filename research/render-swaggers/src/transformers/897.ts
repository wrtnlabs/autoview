import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * View Traffic
     *
     * @title View Traffic
    */
    export type view_traffic = {
        count: number & tags.Type<"int32">;
        uniques: number & tags.Type<"int32">;
        views: Schema.traffic[];
    };
    /**
     * @title Traffic
    */
    export type traffic = {
        timestamp: string & tags.Format<"date-time">;
        uniques: number & tags.Type<"int32">;
        count: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.view_traffic;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Clone and sort the time-series data by timestamp (ascending)
  const sortedViews = [...input.views].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Generate a list of DataListItemProps for each entry
  const items: IAutoView.IAutoViewDataListItemProps[] = sortedViews.map((entry) => {
    // Format timestamp in a compact, locale-sensitive form
    const date = new Date(entry.timestamp);
    const formattedDate = date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      type: "DataListItem",
      // Label shows a calendar icon followed by the formatted timestamp
      label: [
        { type: "Icon", id: "calendar", size: 16, color: "gray" },
        { type: "Text", content: formattedDate, variant: "body2" },
      ],
      // Value shows two small chips: one for views, one for uniques
      value: [
        {
          type: "Chip",
          label: `Views: ${entry.count}`,
          startElement: { type: "Icon", id: "eye", size: 16, color: "blue" },
          color: "blue",
          size: "small",
          variant: "filled",
        },
        {
          type: "Chip",
          label: `Uniques: ${entry.uniques}`,
          startElement: { type: "Icon", id: "user", size: 16, color: "green" },
          color: "green",
          size: "small",
          variant: "filled",
        },
      ],
    };
  });

  // If there's no data, render a friendly markdown message instead of an empty list
  const contentComponent: IAutoView.IAutoViewComponentProps =
    items.length > 0
      ? {
          type: "DataList",
          childrenProps: items,
        }
      : {
          type: "Markdown",
          content: "\n_No traffic data available_\n",
        };

  // Compose the final vertical card UI
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Traffic Overview",
        description: `Total Views: ${input.count}, Unique Visitors: ${input.uniques}`,
        startElement: {
          type: "Icon",
          id: "chart-line",
          size: 24,
          color: "violet",
        },
      },
      {
        type: "CardContent",
        childrenProps: contentComponent,
      },
    ],
  };
}
