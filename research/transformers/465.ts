import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * API Insights usage time stats for an organization
     *
     * @title Time Stats
    */
    export type api_insights_time_stats = {
        timestamp?: string;
        total_request_count?: number & tags.Type<"int32">;
        rate_limited_request_count?: number & tags.Type<"int32">;
    }[];
}
type IAutoViewTransformerInputType = Schema.api_insights_time_stats;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no data, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No data available\nNo API time stats were provided."
    };
  }

  // 1. Create a CardHeader with a clock icon and descriptive title
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "API Time Stats",
    description: "Timeline of total and rate‑limited requests",
    startElement: {
      type: "Icon",
      id: "clock",
      color: "blue",
      size: 24
    }
  };

  // 2. Transform each record into a DataListItem with timestamp + two Chips
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((record) => {
    // Text component for the timestamp label
    const timestampText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: record.timestamp ?? "",
      variant: "body2",
      color: "gray"
    };

    // Chip for total requests
    const totalChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: String(record.total_request_count ?? 0),
      color: "green",
      variant: "filled",
      startElement: {
        type: "Icon",
        id: "network-wired",
        size: 16
      }
    };

    // Chip for rate‑limited requests
    const rateChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: String(record.rate_limited_request_count ?? 0),
      color: "red",
      variant: "filled",
      startElement: {
        type: "Icon",
        id: "ban",
        size: 16
      }
    };

    return {
      type: "DataListItem",
      label: [timestampText],
      value: [totalChip, rateChip]
    };
  });

  // 3. Wrap the list of items in a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items
  };

  // 4. Put the DataList inside a CardContent component
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList]
  };

  // 5. Combine header and content into a responsive VerticalCard
  return {
    type: "VerticalCard",
    childrenProps: [header, content]
  };
}
